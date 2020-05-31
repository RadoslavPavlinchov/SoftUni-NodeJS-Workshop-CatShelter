const env = process.env.NODE_ENV || 'development';
global.__basedir = __dirname;

const cubeModel = require('./models/cube');

// cubeModel.create({ name: 'test', description: 'test test'})
//     .then(createdCube => {
//         console.log(createdCube);
//         return cubeModel.delete(createdCube.id);
//     }).then((deletedCube) => {
//         console.log('deleted cube', deletedCube);
//         console.log('The cube has been deleted');
//     })

cubeModel.update('bf494eb8-9bb3-4791-bf33-4121ba753e3d', { name: 'New name'})
    .then((updated) => console.log(updated));

// const config = require('./config/config')[env];
// const app = require('express')();

// require('./config/express')(app);
// require('./config/routes')(app);

// app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));