const { User, Course } = require('../models');

module.exports = {
    get: {
        create: (req, res) => {
            res.render('course/create')
        },

        all: (req, res) => {
            Course.find({})
                .select({isPublic: 1})
                .then(courses => {
                    res.render('course/all', { courses })
                }).catch(err => {
                    console.log(err);
                })
        },

        details: (req, res) => {
            const id = req.params.id
            Course.findById(id).then(course => {
                course.isCreator = course.creator.toString() === req.user._id.toString();
                console.log(course.isCreator);
                course.paragraphs = course.description.split('\r\n\r\n');
                res.render('course/details', { course });
            }).catch(err => {
                console.log(err);
            })
        },

        edit: (req, res) => {
            const { id } = req.params;
            Course.findById(id)
                .then(course => {
                    res.render('course/edit', course);
                })
        },

        delete: (req, res, next) => {
            const { id } = req.params;
            Course.findByIdAndRemove(id)
                .then(() => {
                    res.redirect('/');
                })
        }
    },
    post: {
        create: (req, res) => {
            let { title, description, imageUrl, isPublic } = req.body;

            if (isPublic) {
                isPublic = true;
            }

            Course.create({ title, description, imageUrl, isPublic })
                .then(() => {
                    res.redirect('/');
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
            const { description } = req.body;

            Course.findByIdAndUpdate({ _id: id }, { description }, { runValidators: true })
                .then(() => {
                    res.redirect(`/course/details/${id}`);
                })
        },

        search: (req, res) => {
            const { search } = req.body;

            Course.find({})
                .select('title')
                .then(courses => {
                    const found = courses.filter(a => 
                        a.title.toLowerCase().includes(search.toLowerCase())
                    )
                    res.render('course/search', { courses: found, search })
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