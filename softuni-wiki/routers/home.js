const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.home.get.home);

module.exports = router;