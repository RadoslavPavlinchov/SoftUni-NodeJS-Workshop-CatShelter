const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../utils/auth');
const courseValidator = require('../utils/courseValidator');

router.get('/create', auth(), controllers.course.get.create);

router.post('/create', auth(), courseValidator, controllers.course.post.create);

router.get('/details/:id', auth(), controllers.course.get.details);

router.get('/edit/:id', auth(), controllers.course.get.edit);

router.post('/edit/:id', courseValidator, controllers.course.post.edit);

router.get('/delete/:id', auth(), controllers.course.get.delete);

module.exports = router;