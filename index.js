'use strict';
const server = require('./lib/server')
require('dotenv').config();

//need mongodbURI to pass in as a second argument 
server.start(process.env.PORT)