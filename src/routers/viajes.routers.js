const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/viajes.controller")


router.get("/viajes", userCtrl.getViajes);


module.exports = router;