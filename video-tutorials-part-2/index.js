require('dotenv').config();

require('./config/database')().then(() => {
    const { port } = require('./config/config');
    const app = require('express')();

    require('./config/express')(app);
    require('./config/routes')(app);

    app.listen(port, console.log(`Server is running on port ${port}!`));
})