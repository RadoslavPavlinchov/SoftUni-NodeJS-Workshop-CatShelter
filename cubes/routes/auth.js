const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/user');

router.get('/register', (req, res) => {
    res.render('register.hbs');
});

router.post('/register', async (req, res) => {
    const status = await registerUser(req, res);

    if (status) { return res.redirect('/'); }

    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('login.hbs');
});

router.post('/login', async (req, res) => {
    const status = await loginUser(req, res);

    if (status) { return res.redirect('/'); }

    res.redirect('/')
});

module.exports = router;