// const { Trip } = require('../models');

module.exports = {
    get: {
        home: (req, res, next) => {
            // Trip.find()
            //     .sort('-createdAt')
            //     .limit(3)
            //     .then(trips => {
            //         trips.forEach(a => {
            //             a.description = a.description.split(' ').slice(0, 50).join(' ');
            //         })
                    res.render('home');
                // })
        }
    }
}
