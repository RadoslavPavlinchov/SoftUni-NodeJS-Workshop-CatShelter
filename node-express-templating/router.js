const express = require('express');
const router = express.Router();

router.use(function timelog(req, res, next) {
    console.log('Time: ', Date.now());
    next()
})

router.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
})

router.get('/about', (req, res) => {
    res.status(200).send('<h1>About Page</h1>')
})

module.exports = router