const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/home', auth(), controllers.home.get.homeLoggedIn)

router.get('/create', auth(), controllers.course.get.create);
router.post('/create', auth(), controllers.course.post.create);

// router.get('/all', controllers.course.get.all);

router.get('/details/:id', auth(), controllers.course.get.details);

router.get('/edit/:id', auth(), controllers.course.get.edit);
router.post('/edit/:id', auth(), controllers.course.post.edit);

router.get('/delete/:id', auth(), controllers.course.get.delete);

router.post('/search', auth(), controllers.course.post.search);

router.get('/enroll/:id', auth(), controllers.course.get.enroll);

module.exports = router;