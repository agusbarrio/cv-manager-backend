'use strict';
const {
  dbConnector: {
    models: { User },
  },
} = require('../../core');

const dbService = {
  create: async function ({ email, password }) {
    await User.create({ email, password });
    return true;
  },
  getOneByEmail: async function (email, attributes = ['id']) {
    const user = await User.findOne({ where: { email }, attributes });
    return user;
  },
};

module.exports = dbService;
