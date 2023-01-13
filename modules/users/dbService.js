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
    const user = await User.updateOne({
      findOptions: { where: id },
      newItem,
    });
    return user;
  },
};

module.exports = dbService;
