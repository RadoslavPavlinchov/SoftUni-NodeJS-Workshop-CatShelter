require('dotenv').config()
const mongoose = require('mongoose')
const config = require('./config/config')
const express = require('express')
const indexRouter = require('./routes')
const app = express()

mongoose.connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.error(err)
    console.log('this is the config print', config.dbUrl);
    throw err
  }

  console.log('Database is setup and running')
})


require('./config/express')(app)

app.use('/', indexRouter)

app.listen(config.port, console.log(`Listening on port ${config.port}!`))