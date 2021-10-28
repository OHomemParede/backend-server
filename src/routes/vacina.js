const router = require("express").Router();
const { VacinaController } = require("../controllers");
const middleware = require("../middlewares");

const { create, updatenome, deletevacina, listavacinas } = new VacinaController();


router.use(middleware.authToken);        // Verifica se o token é Válido.

router.get("/lista", listavacinas)


router.use(middleware.authAdminUsuario); // Verifica se token.usuario.perfil é admin 

router.post("/create", middleware.verifyNomeVacina, create);

router.put("/update/nome", middleware.verifyNomeVacina, updatenome);

router.delete("/delete/:idvacina", middleware.deleteVacina, deletevacina);




router.use((req, res) => {
    res.status(400).json({ error: "Operação desconhecida com o vacina" });
});

module.exports = router;
