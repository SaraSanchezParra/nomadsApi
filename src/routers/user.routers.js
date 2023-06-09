const {Router} = require ("express");
const router = Router();
const apiUserCtrl = require("../controller/user.controller");


router.get("/", apiUserCtrl.getStart);
router.get("/user", apiUserCtrl.getUser);
router.put("/user", apiUserCtrl.putUser);

router.get("/userFound", apiUserCtrl.userFound);


module.exports = router
