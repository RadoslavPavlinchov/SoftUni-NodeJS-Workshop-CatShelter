const config = require('../config/config');

module.exports = {
    get: {
        home: (req, res, next) => {
            res.render('home.hbs');
        }
    }
}
