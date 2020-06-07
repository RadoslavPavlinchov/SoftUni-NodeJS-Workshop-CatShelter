const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbUrl: `mongodb+srv://radoDBuser:${process.env.DB_PASSWORD}@cluster0-omogj.mongodb.net/workshops?retryWrites=true&w=majority`
    },
    production: {}
};

module.exports = config[env];