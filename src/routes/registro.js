const router = require("express").Router();
const { RegistroController } = require("../controllers");
const middleware = require("../middlewares");
const { create, listaregistro, updatedata, updateidvacina, deleteregistro } = new RegistroController();


router.use(middleware.authToken);

router.post("/create", middleware.createRegistro, create);

router.get("/lista", listaregistro);

router.put("/update/data", middleware.updateDataRegistro, updatedata);
router.put("/update/idvacina", middleware.updateIdvacinaRegistro, updateidvacina);

router.delete("/delete", middleware.deleteRegistro, deleteregistro);


module.exports = router;