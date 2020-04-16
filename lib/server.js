'use strict';

//esoteric resources
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
//internal resources 
const authRouter = require('./routes/auth-routes.js')

//app-wide middleware 
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('Found your way home, did you?');
})

app.use(authRouter);

//error handling


module.exports = {
  server: app,
  start: (port, mongodb_uri) => {
    app.listen(port, () => {
      console.log('Whoa, things are up and running on ', port);
    });
  //   let options = {

  //   }

  //   mongoose.connect(mongodb_uri, options)
  }
}