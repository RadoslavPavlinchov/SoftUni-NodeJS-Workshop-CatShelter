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
        },

        details: (req, res, next) => {
            const id = req.params.id
            models.Course.findById(id).then(course => {
                const hbsObject = {
                    pageTitle: 'Details Page',
                    course,
                    isCreator: req.user.id.toString() === course.creator.toString(),
                    isLoggedIn: req.cookies[config.cookie] !== undefined,

                };
                res.render('course-details.hbs', hbsObject);
            }).catch(err => {
                console.log(err);
            })
        },
        edit: (req, res, next) => {
            const { id } = req.params;
            models.Course.findById(id).then(course => {
                const hbsObject = {
                    course,
                    isLoggedIn: req.cookies[config.cookie] !== undefined,
                };
                res.render('edit-course', hbsObject);
            })
        },
        delete: (req, res, next) => {

        }
    },
    post: {
        create: (req, res, next) => {
            const { title, description, imageUrl, isPublic } = req.body;
            const createdAt = new Date();
            const isChecked = isPublic === 'on'

            models.Course.create({ title, description, imageUrl, isPublic: isChecked, createdAt, creator: req.user.id }).then(course => {
                res.redirect('/')
            })
        },
        edit: (req, res, next) => {
            const { id } = req.params;
            const { title, description, imageUrl, isPublic } = req.body;
            const isChecked = isPublic === 'on'

            models.Course.findByIdAndUpdate(id, { title, description, imageUrl, isPublic: isChecked }).then(updated => {
                res.redirect(`/course/details/${id}`);
            })
        }
    }
}