const {Router} = require('express');
const router = Router();
const emailCTRL = require('../controller/email.controller');


router.post('/contactanos', emailCTRL.postEmail);

module.exports = router