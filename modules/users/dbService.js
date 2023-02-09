'use strict';
const {
  dbConnector: {
    models: { User },
  },
} = require('../../core');

const dbService = {
  create: async function ({ email, password }) {
    const user = await User.create({ email, password });
    return user;
  },
  getOneByEmail: async function (email, attributes = ['id']) {
    const user = await User.findOne({ where: { email }, attributes });
    return user;
  },
  editOne: async (id, newItem) => {
    const result = await User.update(newItem, { where: id });
    return result;
  },
};

module.exports = dbService;
