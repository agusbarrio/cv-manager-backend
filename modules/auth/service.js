'use strict';
const usersDbService = require('../users/dbService');
const { ERRORS } = require('../../core');
const encryptationServices = require('../encryptation/service');
const emailsService = require('../emails/service');
const { EMAIL_TEMPLATES } = require('../emails/constants');
const _ = require('lodash');


const register = async function ({ email, password }) {
  const emailAvaible = !(await usersDbService.getOneByEmail(email));
  if (!emailAvaible) throw ERRORS.EMAIL_NOT_AVAIBLE;
  const encryptedPassword = encryptationServices.convertTextToHash(password);
  await usersDbService.create({ email, password: encryptedPassword });
  return true;
};
const login = async function ({ email, password }) {
  const user = await usersDbService.getOneByEmail(email, ['id', 'password']);
  if (!user) throw ERRORS.INVALID_CREDENTIALS;
  const isValidPassword = encryptationServices.compareTextWithHash(password, user.password);
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
  const decodedToken = encryptationServices.validToken(token);
  const userId = decodedToken.data.id;
  const encryptedPassword = encryptationServices.convertTextToHash(password);
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
