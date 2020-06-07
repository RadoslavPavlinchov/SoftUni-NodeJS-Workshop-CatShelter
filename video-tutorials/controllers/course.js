const models = require('../models');
const config = require('../config/config');

module.exports = {
    get: {
        create: (req, res, next) => {
            const hbsObject = {
                pageTitle: 'Home Page',
                isLoggedIn: req.cookies[config.cookie] !== undefined,
                // username: req.user
            };
            res.render('create-course.hbs', hbsObject)
        } 
    },
    post: {
        create: (req, res, next) => {
            const { title, description, imageUrl, isPublic } = req.body;
            const createdAt = new Date();

            models.Course.create({ title, description, imageUrl, isPublic: isPublic === 'on', createdAt, creator: req.user.id }).then(course => {
                res.redirect('/')
            })
        }
    }
}