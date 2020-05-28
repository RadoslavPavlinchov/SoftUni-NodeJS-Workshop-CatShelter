const express = require('express');
const router = express.Router();

router.use(function timelog(req, res, next) {
    console.log('Time: ', Date.now());
    next()
})

router.get('/', (req, res) => {
    res.render(__dirname + '/views/index.hbs', {
        title: 'This is the main title!',
        test: 'We have to work for this body'
    })
})

router.get('/login', (req, res) => {
    res.status(200).send('<h1>Login Page</h1>')
})

router.get('/about', (req, res) => {
    res.status(200).send('<h1>About Page</h1>')
})

module.exports = router