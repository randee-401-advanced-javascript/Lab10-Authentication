'use strict';

console.log('auth.js file was hit');

const Model = require('../models/model.js');
const userSchema = require('../models/user-schema.js');
const UserModel = new Model(userSchema);

const base64Decoder = (encodedString) => {
  console.log('encodedString', encodedString);
  let data = {
    username: '',
    password: '',
  };

  let decodedSting = Buffer.from(encodedString, 'base64').toString();
  let dataPieces = decodedSting.split(':');

  data.username = dataPieces[0];
  data.password = dataPieces[1];

  return data;
}

const getUserFromCredentials = async (userData) => {
  let possibleUser = await UserModel.readByQuery({
    username: userData.username,
  });

  for (let i = 0; i <possibleUser.length; i++){
    let isSame = possibleUser[i].comparePasswords(userData.password);

    if (isSame) {
      return possibleUser[i];
    }
  }
  return userData;
}

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    next({err: 401, msg: 'Missing auth headers'});
    return;
  }
  let authPieces = req.headers.authorization.split(' ');

  if (authPieces.length === 2) {
    if(authPieces[0] === 'Basic') {
      let authData = base64Decoder(authPieces[1]);
      req.user = await getUserFromCredentials(authData);

      next();
      return;
    } else if (authPieces[0] === 'Bearer') {
      let tokenData = UserModel.verifyToken(authPieces[1]);
      req.user = await UserModel.read(tokenData._id);
      next();
      return;
    }
  }

  next({ err: 401, msg: 'Missing correct Auth Header'});
}

module.exports = auth;