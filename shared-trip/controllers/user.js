const { User } = require('../models');
const jwt = require('../utils/jwt');

const { cookie } = require('../config/config');
const config = require('../config/config');

module.exports = {
    get: {
        login: (req, res, next) => {
            res.render('user/login')
        },
        register: (req, res, next) => {
            res.render('user/register')
        },
        logout: (req, res, next) => {
            res.clearCookie(config.cookie)
                .clearCookie('email')
                .redirect('/');
        }
    },
    post: {
        login: (req, res, next) => {
            const { email, password } = req.body;

            User.findOne({ email })
                .then(user => {
                    Promise.all([user, user.matchPassword(password)])
                        .then(([user, match]) => {
                            if (!match) {
                                res.render('user/login', { message: 'User password is invalid' });
                                return;
                            }
                            const token = jwt.createToken({ id: user._id });

                            res.status(201)
                                .cookie(cookie, token) // config.cookie
                                .cookie('email', user.email)
                                .redirect('/')
                        })
                }).catch((err) => {
                    // if (err.name === 'MongoError') {
                    //     const errorMessages = Object.entries(err.errors)
                    //         .map(tuple => {
                    //             tuple[1].message
                    //         });
                    //     res.render('user/login', { errorMessages });
                    //     return;
                    // }
                })
        },
        register: (req, res, next) => {
            const { email, password } = req.body;
            const rePassword = req.body['re-password'];

            if (password !== rePassword) {
                res.render('user/register', {
                    message: ['Passwords do not match!'],
                    oldInput: { email, password, rePassword }
                });
                return;
            }

            User.create({ email, password })
                .then(registeredUser => {
                    const token = jwt.createToken({ id: registeredUser._id });

                    res.cookie(cookie, token)
                        .cookie('email', registeredUser.email)
                        .redirect('/');

                }).catch((err) => {
                    if (err.name === 'MongoError') {

                        res.render('user/register', { 
                            message: 'User already exists',
                            oldInput: { email, password, rePassword }
                         });

                    } else if (err.name === 'ValidationError') {

                        res.render('user/register', { 
                            message: err.message,
                            oldInput: { email, password, rePassword }
                         });

                        return;
                    }
                })
        }
    }
}