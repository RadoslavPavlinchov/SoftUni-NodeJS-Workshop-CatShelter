const { User, Course } = require('../models');

module.exports = {
    get: {
        create: (req, res) => {
            res.render('course/create')
        },

        // all: (req, res) => {
        //     Course.find({})
        //         .select({isPublic: 1})
        //         .then(courses => {
        //             res.render('course/all', { courses })
        //         }).catch(err => {
        //             console.log(err);
        //         })
        // },

        details: (req, res) => {
            const id = req.params.id
            Course.findById(id)
                .lean()
                .populate('usersEnrolled')
                .then(course => {
                    // course.paragraphs = course.description.split('\r\n\r\n');

                    res.render('course/details', {
                        course,
                        isCreator: course.creator.toString() === req.user._id.toString(),
                        isEnrolled: JSON.stringify(course.usersEnrolled).includes(JSON.stringify(req.user._id))
                    });
                }).catch(err => {
                    console.log(err);
                })
        },

        edit: (req, res) => {
            const { id } = req.params;
            Course.findById(id)
                .lean()
                .then(course => {
                    res.render('course/edit', {
                        course
                    });
                })
        },

        // delete: (req, res) => {
        //     const { id } = req.params;

        //     return Promise.all([
        //         Course.updateOne({ _id: id }, { $pull: { usersEnrolled: req.user._id } }),
        //         User.updateOne({ _id: req.user._id }, { $pull: { courses: id } })
        //     ])
        //     .then(() => {
        //         res.redirect('/home');
        //     })
        // },

        delete: (req, res) => {
            const { id } = req.params;
            Course.findByIdAndRemove(id)
                .then(() => {
                    res.redirect('/home-logged');
                })
        },

        enroll: (req, res) => {
            const { id } = req.params;

            return Promise.all([
                Course.updateOne({ _id: id }, { $push: { usersEnrolled: req.user._id } }),
                User.updateOne({ _id: req.user._id }, { $push: { courses: id } })
            ])
                .then(() => {
                    res.redirect(`/course/details/${id}`);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    post: {
        create: (req, res) => {
            let { title, description, imageUrl, isPublic } = req.body;

            if (isPublic) {
                isPublic = true;
            }

            Course.create({ title, description, imageUrl, isPublic, creator: req.user._id })
                .then(() => {
                    res.redirect('/home');
                })
                .catch((err) => {
                    if (err.name === 'MongoError') {

                        res.render('course/create', { errorMessages: ['Course already exists!'] });
                        return;
                    }
                    const errorMessages = Object.entries(err.errors)
                        .map(tuple => {
                            return tuple[1].message
                        });
                    res.render('course/create', { errorMessages });
                })
        },

        edit: (req, res) => {
            const { id } = req.params;
            const { title, description, imageUrl } = req.body;


            Course.findByIdAndUpdate({ _id: id }, { title, description, imageUrl }) // , { runValidators: true }
                .then(() => {
                    res.redirect('/home-logged');
                })
        },

        search: (req, res) => {
            const { search } = req.body;

            Course.find({})
                .select('title')
                .then(courses => {
                    const found = courses.filter(a => 
                        console.log(a.title.includes(search)),
                        // a.title.toLowerCase().includes(search.toLowerCase())
                    )
                    res.render('home-logged', { 
                        courses: found
                    })
                })
        }

        // delete: (req, res, next) => {
        //     const { id } = req.params;
        //     Course.findByIdAndRemove(id)
        //         .then(() => {
        //         res.redirect('/');
        //     })
        // }
    }
}