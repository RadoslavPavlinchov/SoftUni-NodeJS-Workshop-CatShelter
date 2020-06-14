const models = require('../models');
const config = require('../config/config');
const { validationResult } = require('express-validator');

module.exports = {
    get: {
        create: (req, res, next) => {
            const hbsObject = {
                pageTitle: 'Home Page',
                isLoggedIn: req.cookies[config.cookie] !== undefined,
                username: req.user.username
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
            const { id } = req.params;
            models.Course.findByIdAndRemove(id).then(course => {
                res.redirect('/');
            })
        }
    },
    post: {
        create: (req, res, next) => {
            const { title, description, imageUrl, isPublic } = req.body;
            const createdAt = new Date();
            const isChecked = isPublic === 'on'

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.render('create-course.hbs', {
                    message: errors.array()[0].msg,
                    oldInput: req.body
                });
            }

            models.Course.create({ title, description, imageUrl, isPublic: isChecked, createdAt, creator: req.user.id }).then(course => {
                res.redirect('/')
            })
        },
        edit: (req, res, next) => {
            const { id } = req.params;
            const { title, description, imageUrl, isPublic } = req.body;
            const isChecked = isPublic === 'on'

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.render('create-course.hbs', {
                    message: errors.array()[0].msg,
                    oldInput: req.body
                });
            }

            models.Course.findByIdAndUpdate(id, { title, description, imageUrl, isPublic: isChecked }).then(updated => {
                res.redirect(`/course/details/${id}`);
            })
        }
    }
}