const router = require('express').Router();
const { getCubeWithAccessories } = require('../controllers/cubes');
const Cube = require('../models/cube');
const jwt = require('jsonwebtoken');
const { auth, isLoggedInCheck } = require('../controllers/user');

const privateKey = process.env.PRIVATE_KEY;

router.get('/create', auth, isLoggedInCheck, (req, res) => {
    res.render('createCube', {
        title: 'Create Cube | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/create', auth, async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const token = req.cookies['aid'];

    const decodedObj = jwt.verify(token, privateKey);

    const cube = new Cube({
        name: name.trim(),
        description: description.trim(),
        imageUrl,
        difficultyLevel,
        creatorId: decodedObj.userId
    });

    try {
        await cube.save();
        return res.redirect('/')
    } catch (error) {
        res.render('createCube', {
            title: 'Create Cube | Cube Workshop',
            isLoggedIn: req.isLoggedIn,
            error: 'Cube details are not valid'
        });
    }
})

router.get('/details/:id', isLoggedInCheck, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);

    res.render('detailsCube', {
        title: 'Details | Cube Workshop',
        ...cube,
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/edit', auth, isLoggedInCheck, (req, res) => {
    res.render('editCube.hbs', {
        isLoggedIn: req.isLoggedIn
    });
})

router.get('/delete', auth, isLoggedInCheck, (req, res) => {
    res.render('deleteCube.hbs', {
        isLoggedIn: req.isLoggedIn
    });
})

module.exports = router;
