const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/viajes.controller")


router.get("/viajes", userCtrl.getViajes);
router.get("/viajesLog", userCtrl.getViajesLog);
router.get("/topNomads", userCtrl.getTopNomads);

module.exports = router;