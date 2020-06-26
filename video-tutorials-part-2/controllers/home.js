const { Course } = require('../models');

module.exports = {
    get: {
        home: (req, res, next) => {
            Course.find()
                .sort('-usersEnrolled.length')
                .limit(3)
                .then(courses => {
                    res.render('home', { courses });
                })
            // })
            // Course.find()
            //     .sort('-usersEnrolled.length')
            //     .limit(3)
            //     .then(courses => {
            //         courses.forEach(a => {
            //             a.description = a.description.split(' ').slice(0, 50).join(' ');
            //         })
            // res.render('home', { courses: true });
            // })
        },
        homeLoggedIn: (req, res, next) => {
            Course.find()
                .then(courses => {
                    res.render('home-logged', { courses });
                })
        }
    }
}
