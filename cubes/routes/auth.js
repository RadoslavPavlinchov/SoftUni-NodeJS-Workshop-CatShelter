const router = require('express').Router();
const { registerUser } = require('../controllers/user');

router.get('/register', (req, res) => {
    res.render('register.hbs');
});

router.post('/register', async (req, res) => {
    const status = await registerUser(req, res);

    if (status) { return res.redirect('/'); }

    res.redirect('/')
});

router.get('/login', (req, res) => {
    res.render('login.hbs');
})

module.exports = router;