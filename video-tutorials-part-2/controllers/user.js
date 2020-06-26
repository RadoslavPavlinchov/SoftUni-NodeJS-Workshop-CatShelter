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
                                .redirect('/home')
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
            const { username, password } = req.body;
            const rePassword = req.body['repeatPassword'];

            if (password !== rePassword) {
                res.render('user/register', { errorMessages: ['Passwords do not match!'] });
                return;
            }

            User.create({ username, password })
                .then(registeredUser => {
                    const token = jwt.createToken({ id: registeredUser._id });

                    res.cookie(cookie, token)
                        .cookie('username', registeredUser.username)
                        .redirect('/home');

                }).catch((err) => {
                    if (err.name === 'MongoError') {

                        res.render('user/register', { errorMessages: [ 'User already exists' ] });

                    } else if (err.name === 'ValidationError') {

                        const errorMessages = Object.entries(err.errors)
                            .map(tuple => {
                                return tuple[1].message;
                            });

                        res.render('user/register', { errorMessages });

                        return;
                    }
                })
        }
    }
}