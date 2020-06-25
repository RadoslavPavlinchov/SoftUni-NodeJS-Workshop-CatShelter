const routers = require('../routers');

module.exports = (app) => {
    app.use('/', routers.home);
    app.use('/user', routers.user);
    app.use('/trip', routers.trip);

    app.use('*', (req, res) => {
        res.render('404');
    })
}