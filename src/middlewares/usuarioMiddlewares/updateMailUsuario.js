const updateMailUsuario = async (req, res, next) => {
    let { mail = "" } = req.body;
    mail = mail.toString().trim();

    if (!mail)
        return res.status(400).json({ error: "Forneça o seu novo e-mail" });

    next();
};

module.exports = updateMailUsuario;
