
const {Router} = require('express');
const router = Router();
const viajesCTRL = require('../controller/viajes.controller');

router.get("/", viajesCTRL.getStartViajes)

router.get("/viaje", viajesCTRL.getDiasOfViaje)

router.get("/getPI", viajesCTRL.getPIOfDay)

router.get("/viajes", viajesCTRL.getViajes);

router.post("/addViaje", viajesCTRL.postViaje);

router.put("/modifyViaje", viajesCTRL.putViaje)

module.exports = router
