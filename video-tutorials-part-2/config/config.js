const config = {
    development: {
        env: process.env.NODE_ENV,
        port: process.env.PORT,
        dbUrl: process.env.DB_URL,
        cookie: 'x-auth-token'
    },
    production: { }
}

module.exports = config.development;