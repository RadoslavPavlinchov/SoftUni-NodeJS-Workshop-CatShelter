global.__basedir = __dirname;

const dbConnector = require('./config/db');
dbConnector().then(() => {
    const config = require('./config/config')
    const express = require('express');
    const app = express();

    require('./config/express')(app);
    require('./config/routes')(app);

    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
}).catch(err => {
    console.log(err);
})


// const dbUrl = 'mongodb://localhost:27017';
// const { MongoClient } = require('mongodb');
// const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
// client.connect(function(err) {
//     if (err) { console.log(err); return; }
//     console.log('Connected successfully to MongoDB');
//     const db = client.db('testdb');
//     const users = db.collection('users');
//     users.insert({ name: 'test' }).then(user => {
//          console.log(user);
//     })
// });