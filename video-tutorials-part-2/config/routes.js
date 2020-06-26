const routers = require('../routers');

module.exports = (app) => {
    app.use('/', routers.home);
    app.use('/user', routers.user);
    app.use('/course', routers.course);

    app.use('*', (req, res, next) => {
        res.send('<h2>There is no such page friend!</h2>');
    })
}