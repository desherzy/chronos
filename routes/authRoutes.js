const authController = require('../controllers/authController');
const Router = require('express').Router;
const router = new Router();

router.post('/register', authController.registration);

module.exports = router;