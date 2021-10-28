const Token = require("../utils");
const router = require("express").Router();


async function auth(req, res){
    const { token } = req.body;
    const response = await Token.validateToken(token);
    return res.status(200).json({
        response
    })

}

router.post("/auth", auth);

module.exports = router;