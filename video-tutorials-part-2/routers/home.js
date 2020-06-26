const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/', controllers.home.get.home);
router.get('/home', auth(), controllers.home.get.homeLoggedIn);

module.exports = router;