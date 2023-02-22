'use strict';
const {
  dbConnector: {
    models: { Apikey, Resume },
  },
} = require('../../core');
const _ = require('lodash');

const dbService = {
  getAllByUser: async (userId, attributes) => {
    const result = await Apikey.findAll({
      where: { userId },
      attributes,
      include: [{ model: Resume, as: 'resume' }],
    });
    return result;
  },

  createOneByUser: async (userId, newItem) => {
    const createdItem = await Apikey.create({ ...newItem, userId });
    return createdItem;
  },

  deleteOneByUser: async (id, userId) => {
    const count = await Apikey.destroy({ where: { id, userId } });
    return count;
  },

  deleteAllByUser: async (userId) => {
    const count = await Apikey.destroy({ where: { userId } });
    return count;
  },
};

module.exports = dbService;
