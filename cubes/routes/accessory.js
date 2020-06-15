const router = require('express').Router();
const { updateCube } = require('../controllers/cubes');
const { attachedAccessories } = require('../controllers/accessories');
const Accessory = require('../models/accessory');

router.get('/create', (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory'
    });
});

router.post('/create', async (req, res) => {
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

router.get('/attach/:id', async (req, res, next) => {
    const { id: cubeId } = req.params;
    try {
        const data = await attachedAccessories(cubeId);

        res.render('attachAccessory', {
            title: 'Attach accessory',
            ...data
        });
    } catch (err) {
        next(err);
    }
})

router.post('/attach/:id', async (req, res, next) => {
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