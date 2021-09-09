const router = require("express").Router();
const { UsuarioController } = require("../controllers");
const middleware = require("../middlewares");

const { create, login, updatemail, updatesenha, updateperfil } = new UsuarioController();


router.post("/create", middleware.createUsuario, create);

router.get("/login", middleware.loginUsuario, login);


// usuario deve está logado (deve ter um token valido)
router.use(middleware.authToken);

router.put("/update/mail", middleware.updateMailUsuario, updatemail);
router.put("/update/senha", middleware.updateSenhaUsuario, updatesenha);
router.put("/update/perfil", middleware.authAdminUsuario, updateperfil);

router.use((req, res) => {
    res.status(400).json({ error: "Operação desconhecida com o usuário" });
});

module.exports = router;