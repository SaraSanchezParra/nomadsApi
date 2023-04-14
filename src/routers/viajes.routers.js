const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/viajes.controller")


router.get("/viajes", userCtrl.getViajes);
router.get("/viajesDestino", userCtrl.viajes);


module.exports = router;