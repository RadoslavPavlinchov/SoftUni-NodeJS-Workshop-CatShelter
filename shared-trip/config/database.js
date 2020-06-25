const mongoose = require('mongoose');
const config = require('./config');
const dbName = 'shared-trips-db';

module.exports = () => {
    return mongoose.connect(config.dbUrl + dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    console.log('Database is ready!'));
}