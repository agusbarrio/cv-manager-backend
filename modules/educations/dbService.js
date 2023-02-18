'use strict';
const {
  dbConnector: {
    models: { Education },
  },
} = require('../../core');
const _ = require('lodash');

const dbService = {
  getAllByUser: async (userId, attributes) => {
    const result = await Education.findAll({
      where: { userId },
      attributes,
    });
    return result;
  },
  editOneByUser: async (id, userId, newItem) => {
    const result = await Education.update(newItem, { where: { id, userId } });
    return result;
  },
  createOneByUser: async (userId, newItem) => {
    const createdItem = await Education.create({ ...newItem, userId });
    return createdItem;
  },
  deleteOneByUser: async (id, userId) => {
    const count = await Education.destroy({ where: { id, userId } });
    return count;
  },
  deleteAllByUser: async (userId) => {
    const count = await Education.destroy({ where: { userId } });
    return count;
  },
};

module.exports = dbService;
