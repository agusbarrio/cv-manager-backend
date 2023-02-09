'use strict';
const jwt = require('jsonwebtoken');
const usersDbService = require('../users/dbService');
const { TOKEN_DURATION, TOKEN_TYPES } = require('./constants');
const { ERRORS } = require('../../core');
const { envConfig } = require('../../config');
const utils = require('./utils');
const emailsService = require('../emails/service');
const { EMAIL_TEMPLATES } = require('../emails/constants');
const _ = require('lodash');

const createToken = (data, type, options = {}) => {
  const defaultOptions = { expiresIn: TOKEN_DURATION };
  const tokenOptions = _.merge(defaultOptions, options);
  return jwt.sign({ data, type }, envConfig.JWT_SECRET, tokenOptions);
};

const createLoginToken = (userId) =>
  createToken({ id: userId }, TOKEN_TYPES.LOGIN);

const createRecoverPasswordToken = (userId) =>
  createToken({ id: userId }, TOKEN_TYPES.RECOVER_PASSWORD);

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

const requestPasswordRecovery = async ({ email }) => {
  const user = await usersDbService.getOneByEmail(email);
  if (!user) throw ERRORS.EMAIL_NOT_FOUND;
  const token = createRecoverPasswordToken(user.id);
  const url = emailsService.getResetPasswordUrl(token);
  const template = emailsService.getTemplate(
    EMAIL_TEMPLATES.RECOVER_PASSWORD.key,
    { url }
  );
  const sended = await emailsService.sendMail(template, email);
  if (!sended) throw ERRORS.ERROR_SENDING_EMAIL;
};

const resetPassword = async ({ password, token }) => {
  const decodedToken = utils.validToken(token);
  const userId = decodedToken.data.id;
  const encryptedPassword = utils.getEncryptedData(password);
  const result = await usersDbService.editOne(userId, {
    password: encryptedPassword,
  });
  return result;
};

module.exports = {
  register,
  login,
  createToken,
  createLoginToken,
  requestPasswordRecovery,
  resetPassword,
};
