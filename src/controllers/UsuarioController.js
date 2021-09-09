const { UsuarioModel } = require("../models");
const Token = require("../utils");

class UsuarioController {
    // ============================= Create =============================
    async create(req, res) {
        const { mail, senha } = req.body;

        return await UsuarioModel.create({ mail, senha, perfil: "admin" })
            .then(async (r) => {
                const { idusuario, mail, perfil } = r.get();
                return res.status(200).json({ idusuario, mail, perfil });
            })
            .catch((err) => {
                return res.status(400).json({ error: err.message });
            });
    }

    // ============================= Login =============================
    async login(req, res) {
        const { mail, senha } = req.body;

        return await UsuarioModel.findOne({ where: { mail } })
            .then(async (usuario) => {
                if (usuario) {
                    if (usuario.comparePassword(senha, usuario.senha)) {
                        const token = await Token.generateToken({
                            idusuario: usuario.idusuario,
                            mail: usuario.mail,
                        });
                        return res.json({
                            token,
                            idusuario: usuario.idusuario,
                            mail: usuario.mail,
                        });
                    } else
                        return res
                            .status(400)
                            .json({ error: "Dados de login não conferem" });
                } else
                    return res
                        .status(400)
                        .json({ error: "Usuário não identificado" });
            })
            .catch((e) => {
                return res.status(400).json({ error: e.message });
            });
    }

    // ============================= Update Mail =============================
    async updatemail(req, res) {
        const token = await Token.getToken(req);
        const idusuario = token.idusuario;

        const { mail } = req.body;

        return await UsuarioModel.findOne({
            where: { idusuario },
        })
            .then(async (usuario) => {
                if (usuario) {
                    await usuario.update({ mail });
                    return res.status(200).json({
                        idusuario,
                        mail,
                    });
                }
                return res
                    .status(400)
                    .json({ error: "Usuário não identificado" });
            })
            .catch((err) => {
                return res.status(400).json({ error: err.message });
            });
    }

    // ============================= Update Senha =============================
    async updatesenha(req, res) {
        const token = await Token.getToken(req);
        const idusuario = token.idusuario;
        
        const { senha } = req.body;
        return await UsuarioModel.findOne({
            where: { idusuario },
        })
            .then(async (usuario) => {
                if (usuario) {
                    await usuario.update({ senha });
                    return res.status(200).json({
                        idusuario,
                    });
                }
                return res
                    .status(400)
                    .json({ error: "Usuário não identificado" });
            })
            .catch((err) => {
                return res.status(400).json({ error: err.message });
            });
    }

    // ============================= Update Perfil =============================
    async updateperfil(req, res) {
        const { perfil, idusuario } = req.body;
        return await UsuarioModel.findOne({
            where: { idusuario },
        })
            .then(async (usuario) => {
                if (usuario) {
                    await usuario.update({ perfil });
                    return res.status(200).json({
                        idusuario,
                        perfil,
                    });
                }
                return res
                    .status(400)
                    .json({ error: "Usuário não identificado" });
            })
            .catch((err) => {
                return res.status(400).json({ error: err.message });
            });
    }
}

module.exports = UsuarioController;
