const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register.hbs');
})

router.get('/login', (req, res) => {
    res.render('login.hbs');
})

module.exports = router;