'use strict';
const jwt = require('jsonwebtoken');
const usersDbService = require('../users/dbService');
const { LOGIN_TOKEN_DURATION, TOKEN_TYPES } = require('./constants');
const { ERRORS } = require('../../core');
const { envConfig } = require('../../config');
const utils = require('./utils');

const createToken = (data, type, options) =>
  jwt.sign({ data, type }, envConfig.JWT_SECRET, options);

const createLoginToken = (userId) =>
  createToken({ id: userId }, TOKEN_TYPES.LOGIN, {
    expiresIn: LOGIN_TOKEN_DURATION,
  });

const register = async function ({ email, password }) {
  const emailAvaible = !(await usersDbService.getOneByEmail(email));
  if (!emailAvaible) throw ERRORS.EMAIL_NOT_AVAIBLE;
  const encryptedPassword = utils.getEncryptedData(password);
  await usersDbService.create({ email, password: encryptedPassword });
  return true;
};
const login = async function ({ email, password }) {
  const user = await usersDbService.getOneByEmail(email, ['id', 'password']);
  if (!user) throw ERRORS.INVALID_CREDENTIALS;
  const isValidPassword = utils.comparePassword(password, user.password);
  if (!isValidPassword) throw ERRORS.INVALID_CREDENTIALS;
  const token = createLoginToken(user.id);
  return token;
};

module.exports = { register, login, createToken, createLoginToken };
