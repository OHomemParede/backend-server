const { UsuarioModel } = require("../models");
const Token = require("../utils");
const { getToken } = require("../middlewares");

class UsuarioController {

    // ============================= CREATE =============================
    async create(req, res) {
        let { mail, senha, perfil } = req.body;
        mail = (mail || "").toString().trim();
        senha = (senha || "").toString().trim();
        if (mail === "") {
            return res.status(400).json({ error: ["Forneça o seu e-mail para cadastro"] });
        }
        if (senha === "") {
            return res.status(400).json({ error: ["Forneça a senha para cadastro"] });
        }
        if (senha.length < 6 || senha.length > 10) {
            return res.status(400).json({ error: ["A senha deve ter entre 6 e 10 caracteres"] });
        }

        return await UsuarioModel.create({ mail, senha, perfil })
            .then(async (r) => {
                console.log(r.get());
                const { idusuario, mail } = r.get();
                return res.status(200).json({ idusuario, mail });
            })
            .catch((err) => {
                try {
                    return res.status(400).json({
                        error: err.errors.map((item) => item.message),
                        type: "validation",
                    });
                } catch (e) {
                    return res.status(400).json({ error: [e.message] });
                }
            });
    }


    // ============================= LOGIN =============================
    async login(req, res) {
        let { mail, senha } = req.body;
        mail = (mail || "").toString().trim();
        senha = (senha || "").toString().trim();

        if (mail === "")
            return res.status(400).json({ error: ["Forneça o e-mail do seu cadastro"] });

        if (senha === "")
            return res.status(400).json({ error: ["Forneça a sua senha de cadastro"] });


        return await UsuarioModel.findOne({ where: { mail }, }).then(async (usuario) => {
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
                }
                else
                    return res.status(400).json({ error: ["Dados de login não conferem"] });
            }
            else
                return res.status(400).json({ error: ["Usuário não identificado"] });
        }).catch((e) => {
            return res.status(400).json({ error: [e.message] });
        });
    }


    // ============================= UPDATEMAIL =============================
    async updatemail(req, res) {
        console.log(req);
        const token = await getToken(req);
        if (!token || !token.idusuario) {
            return res.status(401).json({ error: ["Efetue o login para continuar"] });
        }

        let { mail } = req.body;
        mail = (mail || "").toString().trim();

        if (mail === "")
            return res.status(400).json({ error: ["Forneça o seu novo e-mail"] });

        if (mail === req.body.mail)
            return res.status(400).json({ error: ["O seu novo e-mail é igual ao atual"] });

        return await UsuarioModel.findOne({ where: { idusuario: token.idusuario } }).then(async (usuario) => {
            if (usuario) {
                await usuario.update({ mail });
                return res.status(200).json({ 
                    mail: mail
                });
            }
            return res.status(400).json({ error: ["Usuário não identificado"] });
        }).catch((err) => {
            try {
                return res.status(400).json({
                    error: err.errors.map((item) => item.message),
                    type: "validation",
                });
            } catch (e) {
                return res.status(400).json({ error: [e.message] });
            }
        });
    }

    // ============================= UPDATESENHA =============================
    async updatesenha(req, res) {
        const token = await getToken(req);
        if (!token || !token.idusuario) {
            return res.status(401).json({ error: ["Efetue o login para continuar"] });
        }

        let { senha } = req.body;
        senha = (senha || "").toString().trim();
        if (senha === "")
            return res.status(400).json({ error: ["Forneça a nova senha"] });

        if (senha.length < 6 || senha.length > 10)
            return res.status(400).json({ error: ["A senha deve ter entre 6 e 10 caracteres"] });


        return await UsuarioModel.findOne({ where: { idusuario: token.idusuario } }).then(async (usuario) => {
            if (usuario) {
                await usuario.update({ senha });
                return res.status(200).json({
                    idusuario: token.idusuario
                });
            }
            return res.status(400).json({ error: ["Usuário não identificado"] });
        }).catch((err) => {
            try {
                return res.status(400).json({
                    error: err.errors.map((item) => item.message),
                    type: "validation",
                });
            } catch (e) {
                return res.status(400).json({ error: [e.message] });
            }
        });
    }
}

module.exports = UsuarioController;