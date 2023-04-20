const {Router}= require ("express")
const router = Router();
const mensajesCtrl = require("../controller/mensajes.controller")


router.get("/mensajes",mensajesCtrl.getMessages)

router.post("/mensajes",mensajesCtrl.postMessages)



module.exports = router;