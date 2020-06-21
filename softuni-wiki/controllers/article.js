const { Article, User } = require('../models');
const config = require('../config/config');
const { validationResult } = require('express-validator');

module.exports = {
    get: {
        create: (req, res, next) => {
            res.render('article/create.hbs', {
                pageTitle: 'Home Page'
            })
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
            const { title, description } = req.body;
            // const createdAt = new Date();
            // const isChecked = isPublic === 'on'

            // const errors = validationResult(req);

            // if (!errors.isEmpty()) {
            //     return res.render('create-course.hbs', {
            //         message: errors.array()[0].msg,
            //         oldInput: req.body
            //     });
            // }

            Article.create({ title, description, creator: req.user._id })
                .then(article => {
                    req.user.articles.push(article._id);

                    return User.findByIdAndUpdate({ id: req.user._id }, req.user);

                }).then(() => {
                    res.redirect('/');
                }).catch((err) => {
                    const errorMessages = Object.entries(err.errors)
                        .map(tuple => {
                            tuple[1].message
                        });
                    res.render('/article/create', { errorMessages });
                    return;
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