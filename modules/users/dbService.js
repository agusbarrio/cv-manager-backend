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
  editOne: async function (id, dataToEdit) {
    const count = await User.update(dataToEdit, { where: { id } });
    return count;
  },
};

module.exports = dbService;
