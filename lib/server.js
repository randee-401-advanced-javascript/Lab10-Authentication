'use strict';

//esoteric resources
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

//internal resources 
const authRouter = require('./routes/auth-routes.js');
const generateSwagger = require('../docs/swagger.js');

//app-wide middleware 
const app = express();

generateSwagger(app);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//routes
/**
 * This route gives us the Homepage message
 * @route GET /
 * returns {String} 200 - the String "Found your way home, did you?"
 */
app.get('/', (req, res) => {
  res.send('Found your way home, did you?');
})

app.use(authRouter);

//error handling

const errorHandler = (err, req, res, next) => {
  res.status(err.err);
  res.send(err.msg);
}

//Exports 

module.exports = {
  server: app,
  start: (port, mongodb_uri) => {
    app.listen(port, () => {
      console.log('Whoa, things are up and running on ', port);
    });
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };

    mongoose.connect(mongodb_uri, options);
  }
}