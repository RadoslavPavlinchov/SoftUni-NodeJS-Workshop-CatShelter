const models = require('../models');
const jwt = require('../utils/jwt');
// it might need to use config instead of cookie
const { cookie } = require('../config/config');

module.exports = {
    get: {
        login: (req, res, next) => {
            res.render('login.hbs', { pageTitle: 'Login Page' })
        },
        register: (req, res, next) => {
            res.render('register.hbs', { pageTitle: 'Register Page' })
        }
    },
    post: {
        login: (req, res, next) => {
            const { username, password } = req.body;

            models.User.findOne({ username }).then(user => {
                Promise.all([user, user.matchPassword(password)])
                    .then(([user, match]) => {
                        if (!match) {
                            console.log('Password is invalid');
                            return;
                        }
                        const token = jwt.createToken({ id: user._id });
                        res.cookie(cookie, token)
                            .redirect('/')
                    })
            });
        },
        register: (req, res, next) => {
            const { username, password, repeatPassword } = req.body;

            models.User.create({ username, password }).then(registeredUser => {
                const token = jwt.createToken({ id: registeredUser._id });

                res.cookie(cookie, token)
                    .redirect('/')
            })
        }
    }
}