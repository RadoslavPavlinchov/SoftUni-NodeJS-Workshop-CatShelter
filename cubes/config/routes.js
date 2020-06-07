// TODO: Require Controllers...
const cubeController = require('../controllers/cubes');

module.exports = (app) => {
    app.get('/details/:id', cubeController.details);
    app.get('/about', cubeController.about);
    app.get('/create', cubeController.getCreate);
    app.post('/create', cubeController.postCreate);
    app.get('/', cubeController.index);
    app.get('*', cubeController.notFound);
};