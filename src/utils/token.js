const JWT = require("jsonwebtoken");

const secret = process.env.JWT_SECRET

class Token {
    async generateToken(user) {
        return JWT.sign(
            user,
            secret,
            { expiresIn: "1hr" }
        );
    }

    async validateToken(token) {
        return JWT.verify(token, secret, (err, decoded) => {
            if (err)
                return err
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
