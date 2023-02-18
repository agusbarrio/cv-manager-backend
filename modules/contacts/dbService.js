'use strict';
const {
  dbConnector: {
    models: { Contact },
  },
} = require('../../core');
const _ = require('lodash');

const dbService = {
  getAllByUser: async (userId, attributes) => {
    const result = await Contact.findAll({
      where: { userId },
      attributes,
    });
    return result;
  },
  editOneByUser: async (id, userId, newItem) => {
    const result = await Contact.update(newItem, { where: { id, userId } });
    return result;
  },
  createOneByUser: async (userId, newItem) => {
    const createdItem = await Contact.create({ ...newItem, userId });
    return createdItem;
  },
  deleteOneByUser: async (id, userId) => {
    const count = await Contact.destroy({ where: { id, userId } });
    return count;
  },
  deleteAllByUser: async (userId) => {
    const count = await Contact.destroy({ where: { userId } });
    return count;
  },
};

module.exports = dbService;
