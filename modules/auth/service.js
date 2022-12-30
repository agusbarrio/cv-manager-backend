'use strict';
const jwt = require('jsonwebtoken');
const usersDbService = require('../users/dbService');
const { LOGIN_TOKEN_DURATION } = require('./constants');
const { ERRORS } = require('../../core');
const { envConfig } = require('../../config');
const utils = require('./utils');

const service = {
  register: async function ({ email, password }) {
    const emailAvaible = !(await usersDbService.getOneByEmail(email));
    if (!emailAvaible) throw ERRORS.EMAIL_NOT_AVAIBLE;
    const encryptedPassword = utils.getEncryptedData(password);
    await usersDbService.create({ email, password: encryptedPassword });
    return true;
  },
  login: async function ({ email, password }) {
    const user = await usersDbService.getOneByEmail(email, ['id', 'password']);
    if (!user) throw ERRORS.INVALID_CREDENTIALS;
    const isValidPassword = utils.comparePassword(password, user.password);
    if (!isValidPassword) throw ERRORS.INVALID_CREDENTIALS;
    const token = jwt.sign({ id: user.id }, envConfig.JWT_SECRET, {
      expiresIn: LOGIN_TOKEN_DURATION,
    });
    return token;
  },
};

module.exports = service;
