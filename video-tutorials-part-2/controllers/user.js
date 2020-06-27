const { User } = require('../models');
const jwt = require('../utils/jwt');

const { cookie } = require('../config/config');

module.exports = {
    get: {
        login: (req, res, next) => {
            res.render('user/login')
        },
        register: (req, res, next) => {
            res.render('user/register')
        },
        logout: (req, res, next) => {
            res.clearCookie(cookie)
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
                                res.render('user/login', { 
                                    message: 'User password is invalid',
                                    oldInput: { username, password }
                                 });
                                return;
                            }
                            const token = jwt.createToken({ id: user._id });

                            res.cookie(cookie, token, { maxAge: 3600000 })
                                .cookie('username', user.username)
                                .redirect('/home')
                        })
                }).catch((err) => {
                    
                    res.render('user/login', {
                        message: err.message,
                        oldInput: { username, password } 
                       });
                   return;
                })
        },
        register: (req, res, next) => {
            const { username, password } = req.body;
            const rePassword = req.body['repeat-password'];

            if (password !== rePassword) {
                res.render('user/register', { 
                    message: 'Passwords do not match!',
                    oldInput: { username, password, rePassword }
                });
                return;
            }

            User.create({ username, password })
                .then(registeredUser => {
                    const token = jwt.createToken({ id: registeredUser._id });

                    res.cookie(cookie, token, { maxAge: 3600000 })
                        .cookie('username', registeredUser.username)
                        .redirect('/home');

                }).catch((err) => {
                    if (err.name === 'MongoError') {

                        res.render('user/register', { 
                            message: 'User already exists!',
                            oldInput: { username, password, rePassword } 
                        });

                    } else if (err.name === 'ValidationError') {

                        res.render('user/register', {
                             message: err.message,
                             oldInput: { username, password, rePassword } 
                            });
                        return;
                    }
                })
        }
    }
}