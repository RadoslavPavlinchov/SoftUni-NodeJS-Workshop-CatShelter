const config = {
    development: {
        env: process.env.NODE_ENV,
        port: process.env.PORT,
        dbUrl: process.env.DB_URL,
        secret: process.env.PRIVATE_KEY,
        cookie: 'x-auth-token'
    },
    production: { }
}

module.exports = config.development;