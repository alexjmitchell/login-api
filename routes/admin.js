const { Router } = require('express');
const router = Router();

const AdminController = require('../controllers/admin_controller');

router.get('/login', AdminController.showLoginPage);

router.get('/register', AdminController.showRegisterPage);

router.post('/register', AdminController.postToRegisterPage);

router.post('/login', AdminController.postToLoginPage);

router.get('/loggedin?', AdminController.isUserLoggedIn);

module.exports = router;
