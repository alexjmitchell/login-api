const router = require('express').Router();

const AdminController = require('../controllers/admin_controller');

router.get('/login', AdminController.showLoginPage);

router.get('/register', AdminController.showRegisterPage);

router.post('/register', AdminController.postToRegisterPage);

router.post('/login', AdminController.postToLoginPage);

module.exports = router;
