const router = require("express").Router();

const usuarioRoute = require("./usuario");
const vacinaRoute = require("./vacina");
const registroRoute = require("./registro");
const auth_token = require('./auth_token');

router.use("/usuario", usuarioRoute);
router.use("/vacina", vacinaRoute);
router.use("/registro", registroRoute);
router.use("/token", auth_token)

router.use( (req, res) => {
    res.status(400).json({error:'Operação desconhecida'});
})

module.exports = router;