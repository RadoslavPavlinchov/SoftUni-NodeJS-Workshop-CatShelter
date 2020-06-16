const router = require('express').Router();
const { getAllCubes } = require('../controllers/cubes');
const { isLoggedInCheck } = require('../controllers/user')

router.get('/', isLoggedInCheck, async (req, res) => {
  const cubes = await getAllCubes();

  res.render('index', {
    title: 'Cube Workshop',
    cubes,
    isLoggedIn: req.isLoggedIn
  });
});

router.get('/about', isLoggedInCheck, (req, res) => {
  res.render('about', {
    title: 'About | Cube Workshop',
    isLoggedIn: req.isLoggedIn
  });
});

router.get('*', (req, res) => {
  res.render('404', {
    title: 'Error | Cube Workshop'
  });
});

module.exports = router;