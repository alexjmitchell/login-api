const { Router } = require('express');
const router = Router();

const AdminController = require('../controllers/admin_controller');
const { authenticateToken } = require('../middleware/auth');

router.get('/login', AdminController.showLoginPage);

router.get('/register', AdminController.showRegisterPage);

router.post('/register', AdminController.postToRegisterPage);

router.post('/login', AdminController.postToLoginPage);

router.get('/loggedin?', AdminController.isUserLoggedIn);

router.get('/logout', AdminController.logout);

router.patch('/editUser', authenticateToken, AdminController.update);

module.exports = router;
