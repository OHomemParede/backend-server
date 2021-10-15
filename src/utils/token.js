const JWT = require("jsonwebtoken");
require("dotenv").config();

class Token {
    async generateToken(user) {
        return JWT.sign(user, process.env.JWT_SECRET, {expiresIn: 1800});
    }

    async validateToken(token) {
        return JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                throw new Error(
                    "Problemas para validar os dados de acesso (Token)"
                );
            else return decoded;
        });
    }

    async getToken(req) {
        const { authorization } = req.headers;
        try {
            const [type, token] = authorization.split(" ");
            return JWT.decode(token);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = new Token();
