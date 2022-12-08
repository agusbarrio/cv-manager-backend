'use strict';
const { createHmac } = require('node:crypto');
const usersDbService = require('../users/dbService');
const { ERRORS } = require('../../core');
const { envConfig } = require('../../config');
const service = {
  getEncryptedPassword: function (password) {
    return password
      ? createHmac('sha256', envConfig.SECRET_KEY_ENCRYPTION)
          .update(password)
          .digest('base64')
      : undefined;
  },
  register: async function ({ email, password }) {
    const emailAvaible = !(await usersDbService.getOneByEmail(email));
    if (!emailAvaible) throw ERRORS.E409;
    const encryptedPassword = this.getEncryptedPassword(password);
    await usersDbService.create({ email, password: encryptedPassword });
    return true;
  },
};

module.exports = service;
