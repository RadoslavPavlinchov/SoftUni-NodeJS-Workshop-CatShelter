const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/create', auth(), controllers.trip.get.create);
router.post('/create', auth(), controllers.trip.post.create);

router.get('/all', auth(), controllers.trip.get.all);

router.get('/details/:id', auth(false), controllers.trip.get.details);

router.get('/edit/:id', auth(), controllers.trip.get.edit);
router.post('/edit/:id', auth(), controllers.trip.post.edit);

router.get('/delete/:id', auth(), controllers.trip.get.delete);

router.post('/search', controllers.trip.post.search);

module.exports = router;