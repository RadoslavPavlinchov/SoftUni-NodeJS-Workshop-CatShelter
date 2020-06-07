const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/create', controllers.course.get.create);

router.post('/create', auth(), controllers.course.post.create);

module.exports = router;