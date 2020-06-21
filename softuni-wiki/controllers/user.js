const { User } = require('../models');
const jwt = require('../utils/jwt');

const { cookie } = require('../config/config');
const config = require('../config/config');

module.exports = {
    get: {
        login: (req, res, next) => {
            res.render('user/login.hbs', { pageTitle: 'Login Page' }) // user/login
        },
        register: (req, res, next) => {
            res.render('user/register.hbs', { pageTitle: 'Register Page' })
        },
        logout: (req, res, next) => {
            res.clearCookie(config.cookie)
                .clearCookie('username')
                .redirect('/');
        }
    },
    post: {
        login: (req, res, next) => {
            const { username, password } = req.body;

            User.findOne({ username })
                .then(user => {
                    Promise.all([user, user.matchPassword(password)])
                        .then(([user, match]) => {
                            if (!match) {
                                res.render('user/login', { message: 'User password is invalid' });
                                return;
                            }
                            const token = jwt.createToken({ id: user._id });

                            res.cookie(cookie, token) // config.cookie
                                .cookie('username', user.username)
                                .redirect('/')
                        })
                }).catch((err) => {
                    if (err.name === 'MongoError') {
                        const errorMessages = Object.entries(err.errors)
                            .map(tuple => {
                                tuple[1].message
                            });
                        res.render('user/login', { errorMessages });
                    }
                })
        },
        register: (req, res, next) => {
            const { username, password, rePassword } = req.body;

            if (password !== rePassword) {
                res.render('user/register', { errorMessages: [ 'Password do not match!' ] });
                return;
            }

            User.create({ username, password })
                .then(registeredUser => {
                    const token = jwt.createToken({ id: registeredUser._id });

                    res.cookie(cookie, token)
                        .cookie('username', user.username)
                        .redirect('/');

                }).catch((err) => {
                    if (err.name === 'ValidationError' || err.name === 'MongoError') {
                        const errorMessages = Object.entries(err.errors)
                            .map(tuple => {
                                tuple[1].message
                            });
                        res.render('user/register', { errorMessages });
                        return;
                    }
                })
        }
    }
}