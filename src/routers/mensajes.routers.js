const {Router}= require ("express")
const router = Router();
const mensajesCtrl = require("../controller/mensajes.controller")


router.get("/mensajes",mensajesCtrl.getMessages)





module.exports = router;