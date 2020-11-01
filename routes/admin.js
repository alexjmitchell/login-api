const { Router } = require('express');
const router = Router();

const AdminController = require('../controllers/admin_controller');
const { authenticateToken } = require('../middleware/auth');

router.post('/register', AdminController.registerNewUser);

router.post('/login', AdminController.loginExistingUser);

router.get('/loggedin?', AdminController.isUserLoggedIn);

router.get('/logout', AdminController.logout);

router.patch('/editUser', authenticateToken, AdminController.update);

router.delete('/deleteUser', authenticateToken, AdminController.delete);

module.exports = router;
