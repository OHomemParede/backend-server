const createRegistro = (req, res, next) => {
    let { idvacina = -1, data = "" } = req.body;
    data = data.toString().trim();

    if (idvacina < 0)
        return res.status(400).json({ erro: "Forneça um [idvacina] válido" });

    if (!data)
        return res.status(400).json({ error: "Forneça uma [data] válida" });

    next();
};

module.exports = createRegistro;
