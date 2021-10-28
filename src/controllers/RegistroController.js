const { RegistroModel } = require("../models");
const { VacinaModel } = require('../models')
const Token = require("../utils");

class RegistroController {
    // ============================= Create =============================
    async create(req, res) {
        const token = await Token.getToken(req);
        if (token.perfil == 'admin') {
            const { idvacina, data, idusuario } = req.body;
            return RegistroModel.create({ idvacina, idusuario, data })
                .then(async (r) => {
                    const { idregistro, idvacina, idusuario, data } = r.get();
                    return res
                        .status(200)
                        .json({ idregistro, idvacina, idusuario, data });
                })
                .catch((err) => {
                    return res.status(400).json({ error: err.message });
                });
        }

        const idusuario = token.idusuario;
        const { idvacina, data } = req.body;


        return RegistroModel.create({ idvacina, idusuario, data })
            .then(async (r) => {
                const { idregistro, idvacina, idusuario, data } = r.get();
                return res
                    .status(200)
                    .json({ idregistro, idvacina, idusuario, data });
            })
            .catch((err) => {
                return res.status(400).json({ error: err.message });
            });
    }


    // ============================= Lista Registros=============================
    async listaregistro(req, res) {
        const token = await Token.getToken(req);
        const idusuario = token.idusuario;
        const perfil = token.perfil;

        if (perfil == 'admin') {
            return await RegistroModel.findAndCountAll({
                attributes: ["idregistro", "idvacina", "data", "idusuario"],
                order: [["data", "DESC"]],
            }).then(async (result) => {
                const dados_vacinas = (await VacinaModel.findAll({ attributes: ["idvacina", "nome"] }))

                const newRegistros = result.rows.map(item => {
                    for (let i = 0; i < dados_vacinas.length; i++) {
                        if (item.dataValues.idvacina == dados_vacinas[i].dataValues.idvacina) {
                            return { ...item.dataValues, nomeVacina: dados_vacinas[i].dataValues.nome }
                        }
                    }
                });

                res.status(200).json({
                    Registros: newRegistros,
                    count: result.count,
                });
            });
        }
        return await RegistroModel.findAndCountAll({
            where: { idusuario },
            attributes: ["idregistro", "idvacina", "data"],
            order: [["data", "DESC"]],
        }).then(async (result) => {
            const dados_vacinas = (await VacinaModel.findAll({ attributes: ["idvacina", "nome"] }))

            const newRegistros = result.rows.map(item => {
                for (let i = 0; i < dados_vacinas.length; i++) {
                    if (item.dataValues.idvacina == dados_vacinas[i].dataValues.idvacina) {
                        return { ...item.dataValues, nomeVacina: dados_vacinas[i].dataValues.nome }
                    }
                }
            });

            res.status(200).json({
                Registros: newRegistros,
                count: result.count,
            });
        });
    }


    // ============================= Update Data =============================
    async updatedata(req, res) {
        const token = await Token.getToken(req);
        if (token.perfil == 'admin') {
            const { idregistro, data, idusuario } = req.body;
            return await RegistroModel.findOne({
                where: { idusuario, idregistro },
            })
                .then(async (registro) => {
                    if (registro) {
                        await registro.update({ data });
                        return res.status(200).json({
                            idregistro,
                            data,
                        });
                    }
                    return res
                        .status(400)
                        .json({ error: "Registro não identificado" });
                })
                .catch((err) => {
                    return res.status(400).json({ error: err.message });
                });
        }

        const idusuario = token.idusuario;
        const { idregistro, data } = req.body;


        return await RegistroModel.findOne({
            where: { idusuario, idregistro },
        })
            .then(async (registro) => {
                if (registro) {
                    await registro.update({ data });
                    return res.status(200).json({
                        idregistro,
                        data,
                    });
                }
                return res
                    .status(400)
                    .json({ error: "Registro não identificado" });
            })
            .catch((err) => {
                return res.status(400).json({ error: err.message });
            });
    }

    // ============================= Update Idvacina =============================
    async updateidvacina(req, res) {
        const token = await Token.getToken(req);
        if (token.perfil == 'admin') {
            const { idregistro, idvacina, idusuario } = req.body;
            return await RegistroModel.findOne({
                where: { idusuario, idregistro },
            })
                .then(async (registro) => {
                    if (registro) {
                        await registro.update({ idvacina });
                        return res.status(200).json({
                            idregistro,
                            idvacina,
                        });
                    }
                    return res
                        .status(400)
                        .json({ error: "Registro não identificado" });
                })
                .catch((err) => {
                    return res.status(400).json({ error: err.message });
                });
        }


        const idusuario = token.idusuario;

        const { idregistro, idvacina } = req.body;

        return await RegistroModel.findOne({
            where: { idusuario, idregistro },
        })
            .then(async (registro) => {
                if (registro) {
                    await registro.update({ idvacina });
                    return res.status(200).json({
                        idregistro,
                        idvacina,
                    });
                }
                return res
                    .status(400)
                    .json({ error: "Registro não identificado" });
            })
            .catch((err) => {
                return res.status(400).json({ error: err.message });
            });
    }

    // ============================= Delete Registro =============================
    async deleteregistro(req, res) {
        const token = await Token.getToken(req);
        if(token.perfil == 'admin'){
            const { idregistro } = req.params;
            return await RegistroModel.destroy({
                where: { idregistro },
            })
                .then(async (user_) => {
                    if (user_)
                        return res.status(200).json({ idregistro });
                    else
                        return res.status(400).json({ error: "something went wrong" });
                })
                .catch((err) => {
                    return res.status(400).json({ error: err.message });
                });
        }

        const idusuario = token.idusuario;
        const { idregistro } = req.params;

        return await RegistroModel.destroy({
            where: { idregistro, idusuario },
        })
            .then(async (user_) => {
                if (user_)
                    return res.status(200).json({ idregistro, idusuario });
                else
                    return res.status(400).json({ error: "something went wrong" });
            })
            .catch((err) => {
                return res.status(400).json({ error: err.message });
            });
    }
}

module.exports = RegistroController;
