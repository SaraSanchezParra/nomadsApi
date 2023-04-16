
const {Router} = require('express');
const router = Router();
const viajesCTRL = require('../controller/viajes.controller');

router.get("/", viajesCTRL.getStartViajes)

router.get("/topViajes", viajesCTRL.getTopViajes);

router.get("/topViajesLog", viajesCTRL.getTopViajesLog);

router.get("/topNomads", viajesCTRL.getTopNomads);

router.get("/viaje", viajesCTRL.getDiasOfViaje);

router.get("/getPI", viajesCTRL.getPIOfDay);

router.get("/viajesDestino",viajesCTRL.viajes);

router.post("/addViaje", viajesCTRL.postViaje);

router.post("/viaje", viajesCTRL.addLike);

router.delete("/viaje", viajesCTRL.removeLike);
router.post("/addDia", viajesCTRL.postDia);

router.post("/addPI", viajesCTRL.postPI)

module.exports = router
