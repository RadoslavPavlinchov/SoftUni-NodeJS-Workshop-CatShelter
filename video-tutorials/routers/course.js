const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/create', controllers.course.get.create);

router.post('/create', auth(), controllers.course.post.create);

router.get('/details/:id', auth(), controllers.course.get.details);

router.get('edit/:id', auth(), controllers.course.get.edit);

router.post('edit/:id', controllers.course.post.edit);

module.exports = router;