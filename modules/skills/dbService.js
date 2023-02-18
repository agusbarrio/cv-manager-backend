'use strict';
const {
  dbConnector: {
    models: { Skill },
  },
} = require('../../core');
const _ = require('lodash');

const dbService = {
  getAllByUser: async (userId, attributes) => {
    const result = await Skill.findAll({
      where: { userId },
      attributes,
    });
    return result;
  },
  editOneByUser: async (id, userId, newItem) => {
    const result = await Skill.update(newItem, { where: { id, userId } });
    return result;
  },
  createOneByUser: async (userId, newItem) => {
    const createdItem = await Skill.create({ ...newItem, userId });
    return createdItem;
  },
  deleteOneByUser: async (id, userId) => {
    const count = await Skill.destroy({ where: { id, userId } });
    return count;
  },
  deleteAllByUser: async (userId) => {
    const count = await Skill.destroy({ where: { userId } });
    return count;
  },
};

module.exports = dbService;
