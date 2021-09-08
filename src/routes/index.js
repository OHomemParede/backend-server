const router = require("express").Router();

const usuarioRoute = require("./usuario");

router.use("/usuario", usuarioRoute);

router.use( (req, res) => {
    res.status(400).json({error:['Operação desconhecida']});
})

module.exports = router;