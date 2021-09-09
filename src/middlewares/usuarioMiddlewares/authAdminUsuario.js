const { UsuarioModel } = require("../../models");
const Token = require("../../utils");

const authAdminUsuario = async (req, res, next) => {
    const token = await Token.getToken(req);
    const idusuario = token.idusuario;

    await UsuarioModel.findOne({
        where: { idusuario },
    })
        .then(async (usuario) => {
            if (!usuario)
                return res
                    .status(400)
                    .json({ error: "Usuário não identificado" });

            if (usuario.perfil === "admin") {
                return next();
            } else return res.status(401).json({ erro: "Usuário não é admin" });
        })
        .catch((err) => {
            return res.status(400).json({ error: err });
        });
};

module.exports = authAdminUsuario;
