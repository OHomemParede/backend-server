const JWT = require("jsonwebtoken");
require("dotenv").config();

class Token {
    async generateToken(user){
        return JWT.sign(user, process.env.JWT_SECRET);
    }

    async validateToken(token){
        return JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                throw new Error('Problema para checar os dados de acesso');
            else
                return decoded;
        });
    }

    async decodeToken(token){
        return JWT.decode(token);
    }
}

module.exports = new Token();