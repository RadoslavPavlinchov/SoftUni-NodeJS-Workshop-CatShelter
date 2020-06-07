const config = require('../config/config');

module.exports = {
    get: {
        home: (req, res, next) => {
            const hbsObject = {
                pageTitle: 'Home Page',
                isLoggedIn: req.cookies[config.cookie] !== undefined,
                // username: req.user
            };

            res.render('home.hbs', hbsObject);
        }
    }
}