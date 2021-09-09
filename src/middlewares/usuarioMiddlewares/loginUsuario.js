const loginUsuario = (req, res, next) => {
    let { mail = "", senha = ""} = req.body;
    mail = mail.toString().trim();
    senha = senha.toString().trim();

    if (!mail)
        return res
            .status(400)
            .json({ error: "Forneça o e-mail do seu cadastro" });

    if (!senha)
        return res
            .status(400)
            .json({ error: "Forneça a sua senha de cadastro" });
    
    next();
};

module.exports = loginUsuario;