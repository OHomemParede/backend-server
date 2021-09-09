module.exports = {
    authToken: require("./authToken"),

    //  Usuario
    createUsuario: require("./usuarioMiddlewares/createUsuario"),
    loginUsuario: require("./usuarioMiddlewares/loginUsuario"),
    updateSenhaUsuario: require("./usuarioMiddlewares/updateSenhaUsuario"),
    updateMailUsuario: require("./usuarioMiddlewares/updateMailUsuario"),
    authAdminUsuario: require("./usuarioMiddlewares/authAdminUsuario"),

    //  Vacina
    verifyNomeVacina: require('./vacinaMiddlewares/verifyNomeVacina'),
    deleteVacina: require("./vacinaMiddlewares/deleteVacina"),

    //  Registro
    createRegistro: require("./registroMiddlewares/createRegistro"),
    updateDataRegistro: require("./registroMiddlewares/updateDataRegistro"),
    updateIdvacinaRegistro: require("./registroMiddlewares/updateIdvacinaRegistro"),
    deleteRegistro: require("./registroMiddlewares/deleteRegistro")
};