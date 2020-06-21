const mongoose = require('mongoose');
const config = require('./config');
const dbName = 'softuni-wiki'; // TODO: Put the database name

module.exports = () => {
    return mongoose.connect(config.dbUrl + dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    console.log('Database is ready!'));
}