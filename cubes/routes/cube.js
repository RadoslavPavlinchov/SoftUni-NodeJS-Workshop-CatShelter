const router = require('express').Router();
const { getCubeWithAccessories } = require('../controllers/cubes');
const Cube = require('../models/cube');
const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;

router.get('/create', (req, res) => {
    res.render('createCube', {
        title: 'Create Cube | Cube Workshop'
    });
});

router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const token = req.cookies['aid'];

    const decodedObj = jwt.verify(token, privateKey);

    const cube = new Cube({ name, description, imageUrl, difficultyLevel, creatorId: decodedObj.userId });

    cube.save((err) => {
        if (err) {
            console.error(err);
            res.redirect('/cube/create');
        } else {
            res.redirect('/');
        }
    })
})

router.get('/details/:id', async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);

    res.render('detailsCube', {
        title: 'Details | Cube Workshop',
        ...cube
    });
});

router.get('/edit', (req, res) => {
    res.render('editCube.hbs');
})

router.get('/delete', (req, res) => {
    res.render('deleteCube.hbs');
})

module.exports = router;
