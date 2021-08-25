const { Router } = require('express');
const { getMail } = require('../controllers/mail.controllers');

const router = Router();

router.get('/', getMail);




module.exports = router;