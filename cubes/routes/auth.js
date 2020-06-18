const router = require('express').Router();
const { registerUser, loginUser, alreadyLogged, auth, isLoggedInCheck } = require('../controllers/user');

router.get('/register', alreadyLogged, isLoggedInCheck, (req, res) => {
    const error = req.query.error ? 'Username or password is not valid' : null;

    res.render('register.hbs', {
        isLoggedIn: req.isLoggedIn,
        error
    });
});

router.post('/register', async (req, res) => {
    const { password } = req.body;
    if (!password || password.length < 8 || !password.match(/^[a-zA-Z0-9]+$/)) {
        res.render('register.hbs', {
            isLoggedIn: req.isLoggedIn,
            error: 'Username or password is not correct'
        });
    }
    const { error } = await registerUser(req, res);

    if (error) {
        return res.render('register.hbs', {
            error: 'Username or password is not correct'
        });
    }

    res.redirect('/');
});

router.get('/login', alreadyLogged, isLoggedInCheck, (req, res) => {
    res.render('login.hbs', {
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/login', async (req, res) => {
    const { error } = await loginUser(req, res);

    if (error) {
        return res.render('login.hbs', {
            error: 'Username or password is not correct'
        });
    }

    res.redirect('/')
});

router.get('/logout', (req, res) => {
    res.clearCookie('aid');
    res.redirect('/');
})

module.exports = router;