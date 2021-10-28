const router = require("express").Router();
const { RegistroController } = require("../controllers");
const middleware = require("../middlewares");
const { create, listaregistro, updatedata, updateidvacina, deleteregistro } = new RegistroController();


// login is required
router.use(middleware.authToken);

router.post("/create", middleware.createRegistro, create);

router.get("/lista", listaregistro);

router.put("/update/data", middleware.updateDataRegistro, updatedata);
router.put("/update/idvacina", middleware.updateIdvacinaRegistro, updateidvacina);

router.delete("/delete/:idregistro", middleware.deleteRegistro, deleteregistro);


module.exports = router;
