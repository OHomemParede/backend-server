const updateDataRegistro = (req, res, next) => {
    let { idregistro = -1, data = "" } = req.body;
    data = data.toString().trim();

    if (idregistro < 0)
        return res.status(400).json({ erro: "Forneça um [idregistro] válido" });

    if (!data)
        return res.status(400).json({ error: "Forneça uma [data] válida" });

    next();
};

module.exports = updateDataRegistro;
