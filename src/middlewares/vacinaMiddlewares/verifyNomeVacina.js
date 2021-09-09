const verifyNomeVacina = (req, res, next) => {
    let { nome = "" } = req.body;
    nome = nome.toString().trim();

    if (!nome)
        return res.status(400).json({ error: "Forneça um nome" });

    next();
};

module.exports = verifyNomeVacina;