const { Article } = require('../models');

module.exports = {
    get: {
        home: (req, res, next) => {
            Article.find()
                .sort('-createdAt')
                .limit(3)
                .then(articles => {
                    articles.forEach(a => {
                        a.description = a.description.split(' ').slice(0, 50).join(' ');
                    })
                    res.render('home', { articles });
                })
        }
    }
}
