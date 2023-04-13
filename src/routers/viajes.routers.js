const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/viajes.controller")


router.get("/viajes", userCtrl.getViajes);
router.get("/viajesLog", userCtrl.getViajesLog);

module.exports = router;