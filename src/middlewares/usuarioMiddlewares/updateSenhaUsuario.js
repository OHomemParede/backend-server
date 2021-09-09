const updateSenhaUsuario = async (req, res, next) => {
    let { senha = "" } = req.body;
    senha = senha.toString().trim();

    if (!senha) return res.status(400).json({ error: "Forneça a nova senha" });

    if (senha.length < 6 || senha.length > 10)
        return res
            .status(400)
            .json({ error: "A senha deve ter entre 6 e 10 caracteres" });

    next();
};

module.exports = updateSenhaUsuario;
