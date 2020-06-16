const router = require('express').Router();
const { registerUser, loginUser, alreadyLogged, auth, isLoggedInCheck } = require('../controllers/user');

router.get('/register', alreadyLogged, isLoggedInCheck, (req, res) => {
    res.render('register.hbs', {
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/register', async (req, res) => {
    const status = await registerUser(req, res);

    if (status) { return res.redirect('/'); }

    res.redirect('/user/register');
});

router.get('/login', alreadyLogged, isLoggedInCheck, (req, res) => {
    res.render('login.hbs', {
        isLoggedIn: req.isLoggedIn
        });
});

router.post('/login', async (req, res) => {
    const status = await loginUser(req, res);

    if (status) { return res.redirect('/'); }

    res.redirect('/user/login')
});

module.exports = router;