const router = require('express').Router();

const StaticController = require('../controllers/static_controller');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, StaticController.home);

module.exports = router;
