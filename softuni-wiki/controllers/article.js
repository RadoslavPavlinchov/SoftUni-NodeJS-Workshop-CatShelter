const { Article, User } = require('../models');

module.exports = {
    get: {
        create: (req, res) => {
            res.render('article/create', {
                pageTitle: 'Home Page'
            })
        },

        all: (req, res) => {
            Article.find({})
                .select('title')
                .then(articles => {
                    res.render('article/all', { articles })
                }).catch(err => {
                    console.log(err);
                })
        },

        details: (req, res) => {
            const id = req.params.id
            Article.findById(id).then(article => {
                article.isCreator = article.creator.toString() === req.user._id.toString();
                console.log(article.isCreator);
                article.paragraphs = article.description.split('\r\n\r\n');
                res.render('article/details', { article });
            }).catch(err => {
                console.log(err);
            })
        },

        edit: (req, res) => {
            const { id } = req.params;
            Article.findById(id)
                .then(article => {
                    res.render('article/edit', article);
                })
        },

        delete: (req, res, next) => {
            const { id } = req.params;
            Article.findByIdAndRemove(id)
                .then(() => {
                    res.redirect('/');
                })
        }
    },
    post: {
        create: (req, res) => {
            const { title, description } = req.body;

            Article.create({ title, description, creator: req.user._id })
                .then(article => {
                    req.user.articles.push(article._id);

                    return User.findByIdAndUpdate({ _id: req.user._id }, req.user);

                }).then(() => {
                    res.redirect('/');
                }).catch((err) => {
                    if (err.name === 'MongoError') {

                        res.render('article/create', { errorMessages: ['Article already exists!'] });
                        return;
                    }
                    const errorMessages = Object.entries(err.errors)
                        .map(tuple => {
                            return tuple[1].message
                        });
                    res.render('article/create', { errorMessages });
                })
        },

        edit: (req, res) => {
            const { id } = req.params;
            const { description } = req.body;

            Article.findByIdAndUpdate({ _id: id }, { description }, { runValidators: true })
                .then(() => {
                    res.redirect(`/article/details/${id}`);
                })
        },

        search: (req, res) => {
            const { search } = req.body;

            Article.find({})
                .select('title')
                .then(articles => {
                    const found = articles.filter(a => {
                        a.title.toLowerCase().includes(search.toLowerCase());
                    })
                    res.render('article/search', { articles: found, search })
                }) 
        }

        // delete: (req, res, next) => {
        //     const { id } = req.params;
        //     Article.findByIdAndRemove(id)
        //         .then(() => {
        //         res.redirect('/');
        //     })
        // }
    }
}