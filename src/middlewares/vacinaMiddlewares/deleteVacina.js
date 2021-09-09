const deleteVacina = (req, res, next) => {
    let { idvacina = 0 } = req.body;

    if (idregistro < 0)
        return res.status(400).json({ erro: "Forneça um [idvacina] válido" });

    next();
};

module.exports = deleteVacina;