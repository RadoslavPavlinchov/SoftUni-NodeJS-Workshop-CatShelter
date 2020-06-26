const { Course } = require('../models');

module.exports = {
    get: {
        home: (req, res, next) => {
            // Course.find()
            //     .sort('-createdAt')
            //     .limit(3)
            //     .then(courses => {
            //         courses.forEach(a => {
            //             a.description = a.description.split(' ').slice(0, 50).join(' ');
            //         })
                    res.render('home', { courses: true });
                // })
        }
    }
}
