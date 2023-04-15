const {Router} = require('express');
const router = Router();
const userCtrl = require("../controller/user.controller");



router.get("/userFound", userCtrl.userFound);


module.exports = router;