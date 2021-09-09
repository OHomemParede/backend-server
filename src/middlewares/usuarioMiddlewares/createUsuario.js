const createUsuario = (req, res, next) => {
    let { mail = "", senha = ""} = req.body;

    mail = mail.toString().trim();
    senha = senha.toString().trim();


    if (!mail) 
        return res.status(400).json({ error: "Forneça o seu e-mail para cadastro" });
    
    if (!senha) 
        return res.status(400).json({ error: "Forneça a senha para cadastro" });
    
    if (senha.length < 6 || senha.length > 10) 
        return res.status(400).json({ error: "A senha deve ter entre 6 e 10 caracteres" });

    
    next();
}

module.exports = createUsuario;