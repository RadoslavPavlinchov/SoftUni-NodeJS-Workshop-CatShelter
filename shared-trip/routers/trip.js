const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../utils/auth');
const validations = require('../utils/validator'); // import the validator func created in utils

router.get('/create', auth(), controllers.trip.get.create);
router.post('/create', auth(), validations, controllers.trip.post.create); // , validations - This should be added if we use the express-validator

router.get('/all', auth(), controllers.trip.get.all);

router.get('/details/:id', auth(), controllers.trip.get.details);

router.get('/edit/:id', auth(), controllers.trip.get.edit);
router.post('/edit/:id', auth(), controllers.trip.post.edit);

router.get('/delete/:id', auth(), controllers.trip.get.delete);

router.get('/join/:id', auth(), controllers.trip.get.join);

router.post('/search', controllers.trip.post.search);

module.exports = router;