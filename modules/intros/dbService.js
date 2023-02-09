'use strict';
const {
  dbConnector: {
    models: { Intro },
  },
} = require('../../core');
const _ = require('lodash');

const dbService = {
  getAllByUser: async (userId, attributes) => {
    const intros = await Intro.findAll({
      where: { userId },
      attributes,
    });
    return intros;
  },
  editOneByUser: async (id, userId, newItem) => {
    const intro = await Intro.update(newItem, { where: { id, userId } });
    return intro;
  },
  createOneByUser: async (userId, newItem) => {
    const createdItem = await Intro.create({ ...newItem, userId });
    return createdItem;
  },
  deleteOneByUser: async (id, userId) => {
    const count = await Intro.destroy({ where: { id, userId } });
    return count;
  },
  deleteAllByUser: async (userId) => {
    const count = await Intro.destroy({ where: { userId } });
    return count;
  },
};

module.exports = dbService;
