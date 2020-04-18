'use strict';

//esoteric resources 
const express = require('express');
const bycrypt = requre('bcrypt')

//internal resources
const Model = require('./models/model.js');
const userSchema = require('./models/user-schema.js');
const router = express.Router();
 
//route-wide middleware

const base64Decoder = (encodeStr) => {
  let data = {
    username: '',
    password: ''
  };
  let decodedStr = new Buffer.from(encodeStr, 'base64').toString();
  let dataPieces = decodedStr.split(':');
  data.username = dataPieces[0];
  data.password = dataPieces[1];
  return data
}

//routes

router.post('/signup', async (req, res) => {
  //create a user from either data in 
  //req.headers.authroization || req.body
  //both are the same, but req.headers will be the same as signin
  let basicAuth = req.headers.authorization.split(' ');
  if (basicAuth.length === 2 && basicAuth[0] === 'Basic') {
    let userData = base64Decoder(basicAuth[1])
    let user = await UserModel.create({...userData, ... req.body});
    res.send(user);
  }
  res.end();
})
 
router.post('/signin', async (req, res) => {
  // get user data from encoded basic auth
  let basicAuth = req.headers.authorization.split(' ');
  if (basicAuth.length === 2 && basicAuth[0] === 'Basic') {
    let userData = base64Decoder(basicAuth[1])

    let possibleUser = await UserModel.readByQuery({username: userData.username,})
    
    for (let i = 0; i < possibleUser.length; i++) {
      let isSame = await bycrypt.compare(
        userData.password,
        possibleUser[i].password,
      )
      if (isSame) {
        req.user = possibleUser[i];
        break;
      }
      if 
    }

    if (req.user){
      res.status(200)
      res.send('Found You!');
    } else {
      res.status(401);
      res.send('Oups, cant find you!');
    }

    res.send('in progress');
  }
  res.end('signin');
})


//error handling

//exports
module.exports = router;