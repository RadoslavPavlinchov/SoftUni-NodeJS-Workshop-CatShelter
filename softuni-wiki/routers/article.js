const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/create', auth(), controllers.article.get.create);
router.post('/create', auth(), controllers.article.post.create);

router.get('/details/:id', auth(), controllers.article.get.details);

router.get('/edit/:id', auth(), controllers.article.get.edit);
router.post('/edit/:id', controllers.article.post.edit);

router.get('/delete/:id', auth(), controllers.article.get.delete);

module.exports = router;