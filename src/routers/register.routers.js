const {Router}= require ("express")
const router = Router();
const registrerCtrl = require("../controller/register.controller")



router.get("/registrar",registrerCtrl.getRegister)
router.post("/registrar",registrerCtrl.postRegister)



module.exports = router;


