const router = require('express').Router();
const { updateCube } = require('../controllers/cubes');
const { attachedAccessories } = require('../controllers/accessories');
const Accessory = require('../models/accessory');
const { auth, isLoggedInCheck } = require('../controllers/user');

router.get('/create', auth, isLoggedInCheck, (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/create', auth, async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body
    const accessory = new Accessory({
        name,
        description,
        imageUrl
    });
    await accessory.save();
    res.redirect('/accessory/create');
})

router.get('/attach/:id', auth, isLoggedInCheck, async (req, res, next) => {
    const { id: cubeId } = req.params;
    try {
        const data = await attachedAccessories(cubeId);

        res.render('attachAccessory', {
            title: 'Attach accessory',
            ...data,
            isLoggedIn: req.isLoggedIn
        });
    } catch (err) {
        next(err);
    }
})

router.post('/attach/:id', auth, async (req, res, next) => {
    const { accessory: accessoryId } = req.body;
    const { id: cubeId } = req.params;
    try {
        await updateCube(cubeId, accessoryId);
        res.redirect(`/cube/details/${cubeId}`);
    } catch (err) {
        next(err);
    }
})

module.exports = router;