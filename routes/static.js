const router = require('express').Router();

const StaticController = require('../controllers/static_controller');

router.get('/', StaticController.home);

module.exports = router;
