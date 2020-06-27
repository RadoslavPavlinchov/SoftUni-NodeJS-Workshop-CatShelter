const mongoose = require('mongoose');
const config = require('./config');
const dbName = 'tutorials-collection';

module.exports = () => {
    return mongoose.connect(config.dbUrl + dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    console.log('Database is ready!'));
}