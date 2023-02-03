'use strict ';
const { createHmac } = require('crypto');
const { envConfig } = require('../../config');
const { ERRORS } = require('../../core');
const jwt = require('jsonwebtoken');

const getEncryptedData = function (data) {
  return data
    ? createHmac('sha256', envConfig.SECRET_KEY_ENCRYPTION)
        .update(data)
        .digest('base64')
    : undefined;
};
const comparePassword = function (passwordPlain, hashPassword) {
  return getEncryptedData(passwordPlain) === hashPassword;
};
const validToken = function (token) {
  if (!token) throw ERRORS.E401;
  let decodedToken;
  jwt.verify(token, envConfig.JWT_SECRET, function (err, decoded) {
    if (err) throw ERRORS.E401;
    decodedToken = decoded;
  });
  return decodedToken;
};

module.exports = { getEncryptedData, comparePassword, validToken };
