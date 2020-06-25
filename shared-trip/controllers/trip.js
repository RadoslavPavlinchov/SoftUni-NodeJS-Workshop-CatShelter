const { Trip, User } = require('../models');

module.exports = {
    get: {
        create: (req, res) => {
            res.render('trip/create')
        },

        all: (req, res) => {
            // Trip.find({})
            //     .select('title')
            //     .then(trips => {
            // res.render('trip/all') // , { trips }
            // }).catch(err => {
            //     console.log(err);
            // })
            Trip.find()
                .then(trips => {
                    res.render('trip/all', { trips })
                })
        },

        details: (req, res) => {
            const id = req.params.id
            Trip.findById(id).then(trip => {
                trip.isCreator = trip.creator.toString() === req.user._id.toString();
                console.log(trip.isCreator);
                trip.paragraphs = trip.description.split('\r\n\r\n');
                res.render('trip/details', { trip });
            }).catch(err => {
                console.log(err);
            })
        },

        edit: (req, res) => {
            const { id } = req.params;
            Trip.findById(id)
                .then(trip => {
                    res.render('trip/edit', trip);
                })
        },

        delete: (req, res, next) => {
            const { id } = req.params;
            Trip.findByIdAndRemove(id)
                .then(() => {
                    res.redirect('/');
                })
        }
    },
    post: {
        create: (req, res) => {
            let { startAndEndPoint, dateTime, carImage, seats, description } = req.body;

            let [startPoint, endPoint] = startAndEndPoint.split(' - ');
            let [date, time] = dateTime.split(' - ');

            Trip.create({ startPoint, endPoint, date, time, carImage, seats, description })
                .then(() => {
                    console.log('wtf');
                    res.redirect('/trip/all');
                    // .then(trip => {
                    //     req.user.trips.push(trip._id);
                    //     return User.findByIdAndUpdate({ _id: req.user._id }, req.user);
                    // })

                }).catch((err) => {
                    console.log(err);
                    if (err.name === 'MongoError') {

                        res.render('trip/create', { errorMessages: ['Trip already exists!'] });
                        return;
                    }
                    const errorMessages = Object.entries(err.errors)
                        .map(tuple => {
                            return tuple[1].message
                        });
                    res.render('trip/create', { errorMessages });
                })
        },

        edit: (req, res) => {
            const { id } = req.params;
            const { description } = req.body;

            Trip.findByIdAndUpdate({ _id: id }, { description }, { runValidators: true })
                .then(() => {
                    res.redirect(`/trip/details/${id}`);
                })
        },

        search: (req, res) => {
            const { search } = req.body;

            Trip.find({})
                .select('title')
                .then(trips => {
                    const found = trips.filter(a =>
                        a.title.toLowerCase().includes(search.toLowerCase())
                    )
                    res.render('trip/search', { trips: found, search })
                })
        }

        // delete: (req, res, next) => {
        //     const { id } = req.params;
        //     Trip.findByIdAndRemove(id)
        //         .then(() => {
        //         res.redirect('/');
        //     })
        // }
    }
}