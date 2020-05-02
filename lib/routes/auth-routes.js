'use strict';

console.log(' on auth-routes file');

//esoteric resources 
const express = require('express');
const bcrypt = require('bcrypt')

//internal resources
const Model = require('../models/model.js');
const userSchema = require('../models/user-schema.js');
const auth = require('../middleware/auth.js');

//variables 
const router = express.Router();
const UserModel = new Model(userSchema);
 
//route-wide middleware

router.post('/signup', auth, async (req, res, next) => {
  console.log('inside sighup route');
  console.log(req.user);
  if (req.user.username && !req.user._id) {
    let user = await UserModel.create({ ...req.user, ...req.body})
    let token = user.generateToken();
    res.status(201);
    res.send({ user, token });
    return;
  }else {
    console.log('in else');
    next({ err: 401, msg: 'Shoot! User already exists. Did you know you had a twin?!'});
  }
})

router.post('/signin', auth, async (req, res, next) => {
  if (req.user._id) {
    res.status(200);
    let token = req.user.generateToken()
    res.send({ user: req.user, token: token});
     return;
  } else {
    next ({ err: 401, msg: 'User not found' })
  }
}); 

router.get('/hidden', auth, async (req, res, next) => {
  console.log(req.user);
  if (req.user._id) {
    res.status(200);
    res.send('Top Secret Info Here! Only logged in users have access. Log yourself in, buddy!');
  } else {
    next({ err: 401, msg: 'Not Logged in or invalid token.' });
  }
});



//exports
module.exports = router;