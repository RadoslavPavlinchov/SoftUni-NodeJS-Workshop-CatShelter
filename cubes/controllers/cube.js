const cubeModel = require('../models/cube');

function index(req, res, next) {
    const { search, from, to } = req.query;
    const findFn = item => {
        let result = true;
        if(search) {
            result = item.name.toLowerCase().includes(search);
        }
        if(search && from) {
            result = +item.difficultyLevel >= +from;
        }
        if(search && to) {
            result = +item.difficultyLevel <= +to;
        }
        return result;
    }
    cubeModel.find(findFn).then(cubes => {
        res.render('index.hbs', { cubes, search, from, to });
    }).catch(next);
}

function details(req, res, next) {
    const { id } = req.params;
    cubeModel.get(id).then(cube => {
        if (!cube) { res.redirect('404.hbs'); return; };
        res.render('details.hbs', { cube });
    }).catch(next);
}

function notFound(req, res) {
    res.render('404.hbs');
}

function about(req, res) {
    res.render('about.hbs');
}

function getCreate(req, res) {
    res.render('create.hbs');
}

function postCreate(req, res) {
    const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
    const newCube = cubeModel.create(name, description, imageUrl, difficultyLevel);
    cubeModel.insert(newCube).then(() => {
        res.redirect('/')
    })
}

module.exports = {
    index,
    details,
    notFound,
    about,
    getCreate,
    postCreate
}