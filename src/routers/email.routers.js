const {Router} = require('express');
const router = Router();
const emailCTRL = require('../controller/email.controller');


router.post('/email/contactanos', emailCTRL.postEmail);

module.exports = router