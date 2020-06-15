require('dotenv').config();

const mongoose = require('mongoose');
const config = require('./config/config');
const express = require('express');
const accessoryRouter = require('./routes/accessory');
const cubeRouter = require('./routes/cube');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes');

const app = express();

mongoose.connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.error(err)
    throw err
  }

  console.log('Database is setup and running');
})

require('./config/express')(app)

app.use('/accessory', accessoryRouter);
app.use('/cube', cubeRouter);
app.use('/user', authRouter);
app.use('/', indexRouter);

app.listen(config.port, console.log(`Listening on port ${config.port}!`));