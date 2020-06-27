const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

function createToken(data) {
  return jwt.sign(data, secret, { expiresIn: '60m' });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
      return;
    });
  });
}

module.exports = {
  createToken,
  verifyToken
}