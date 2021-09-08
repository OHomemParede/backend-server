const Token = require("../utils");

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).json({ error: ["É necessário efetuar o login"] });

    const [type, token] = authorization.split(" ");

    try {
        await Token.validateToken(token);
        return next();
    } catch (error) {
        return res.status(401).json({ error: [error.message] });
    }
};

const getToken = async (req) => {
    const { authorization } = req.headers;
    try {
        const [, token] = authorization.split(" ");
        return Token.decodeToken(token);
    }
    catch (error) {
        return null;
    }
}

module.exports = { authMiddleware, getToken };