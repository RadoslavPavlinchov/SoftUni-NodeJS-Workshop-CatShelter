const config = {
    development: {
        port: process.env.PORT,
        dbUrl: process.env.DB_URL,
        env: process.env.NODE_ENV
    },
    production: {}
};

module.exports = config.development;