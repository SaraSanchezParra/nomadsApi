
const {Router} = require('express');
const router = Router();
const viajesCTRL = require('../controller/viajes.controller');

router.get("/", viajesCTRL.getStartViajes)

router.get("/viaje", viajesCTRL.getDiasOfViaje)

router.get("/getDays", viajesCTRL.getDiasOfViaje)

router.get("/viajes", userCtrl.getViajes);

module.exports = router
