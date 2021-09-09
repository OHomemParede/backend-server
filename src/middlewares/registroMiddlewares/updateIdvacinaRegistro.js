const updateIdvacinaRegistro = (req, res, next) => {
    let { idregistro = -1, idvacina = -1 } = req.body;

    if (idregistro < 0)
        return res.status(400).json({ erro: "Forneça um [idregistro] válido" });

    if (idvacina < 0)
        return res.status(400).json({ error: "Forneça uma [idvacina] válida" });

    next();
};

module.exports = updateIdvacinaRegistro;
