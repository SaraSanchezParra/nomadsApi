const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/viajes.controller")


router.get("/topViajes", userCtrl.getTopViajes);
router.get("/topViajesLog", userCtrl.getTopViajesLog);
router.get("/topNomads", userCtrl.getTopNomads);

module.exports = router;