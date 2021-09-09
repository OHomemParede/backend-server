const { RegistroModel } = require("../models");
const Token = require("../utils");

class RegistroController {
    // ============================= Create =============================
    async create(req, res) {
        const token = await Token.getToken(req);
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

        return await RegistroModel.findAndCountAll({
            where: { idusuario },
            attributes: ["idregistro", "idvacina", "data"],
            order: [["data", "DESC"]],
        }).then((result) => {
            res.status(200).json({
                Registros: result.rows,
                count: result.count,
            });
        });
    }

    // ============================= Update Data =============================
    async updatedata(req, res) {
        const token = await Token.getToken(req);
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
        const idusuario = token.idusuario;
        
        const { idregistro } = req.body;
        return await RegistroModel.destroy({
            where: { idregistro, idusuario },
        })
            .then(async () => {
                res.status(200).json({ idregistro, idusuario });
            })
            .catch((err) => {
                return res.status(400).json({ error: err.message });
            });
    }
}

module.exports = RegistroController;
