const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT,
        dbUrl: process.env.DB_URL
    },
    production: {}
};

module.exports = config[env];