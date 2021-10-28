const deleteRegistro = (req, res, next) => {
    let { idregistro = -1 } = req.params;

    if (idregistro < 0)
        return res.status(400).json({ erro: "Forneça um [idregistro] válido" });

    next();
};

module.exports = deleteRegistro;