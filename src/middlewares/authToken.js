const Token = require("../utils");

const authToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res
            .status(401)
            .json({
                error: "É necessário efetuar o login. (Não possuí um Token)",
            });

    const [type, token] = authorization.split(" ");

    try {
        await Token.validateToken(token);
        return next();
    } catch (error) {
        return res.status(401).json({ error: [error.message] });
    }
};

module.exports = authToken;
