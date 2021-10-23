const deleteVacina = (req, res, next) => {
    const { idvacina = 0 } = req.body;

    if (idvacina < 0)
        return res.status(400).json({ erro: "Forneça um [idvacina] válido" });

    next();
};

module.exports = deleteVacina;