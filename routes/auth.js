const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.get('/login', AuthController.login_get);
router.post('/login', AuthController.login_post);
router.get('/register', AuthController.register_get);
router.post('/register', AuthController.register_post);
router.get('/logout', AuthController.logout_get);

module.exports = router;