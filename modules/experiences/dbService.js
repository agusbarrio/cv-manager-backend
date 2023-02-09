'use strict';
const {
  dbConnector: {
    models: { Experience },
  },
  ERRORS,
} = require('../../core');
const _ = require('lodash');

const dbService = {
  getAllByUser: async (userId, attributes) => {
    const experiences = await Experience.findAll({
      where: { userId },
      attributes,
    });
    return experiences;
  },
  editOneByUser: async (id, userId, newItem) => {
    const result = await Experience.update(newItem, { where: { id, userId } });
    return result;
  },
  createOneByUser: async (userId, newItem) => {
    const createdItem = await Experience.create({ ...newItem, userId });
    return createdItem;
  },
  deleteOneByUser: async (id, userId) => {
    const count = await Experience.destroy({ where: { id, userId } });
    return count;
  },
  deleteAllByUser: async (userId) => {
    const count = await Experience.destroy({ where: { userId } });
    return count;
  },
};

module.exports = dbService;
