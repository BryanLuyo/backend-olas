const { Router } = require('express');
const { adduser,getUser, generarToken }  = require('../controllers/auth.controller');

const router = Router();

router.post('/', adduser);
router.get('/', getUser);
router.post('/a9u0knyp0vp',generarToken);

module.exports = router;
