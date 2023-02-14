'use strict';
const {
  dbConnector: {
    models: { Project },
  },
} = require('../../core');
const _ = require('lodash');

const dbService = {
  getAllByUser: async (userId, attributes) => {
    const projects = await Project.findAll({
      where: { userId },
      attributes,
    });
    return projects;
  },
  editOneByUser: async (id, userId, newItem) => {
    const result = await Project.update(newItem, { where: { id, userId } });
    return result;
  },
  createOneByUser: async (userId, newItem) => {
    const createdItem = await Project.create({ ...newItem, userId });
    return createdItem;
  },
  deleteOneByUser: async (id, userId) => {
    const count = await Project.destroy({ where: { id, userId } });
    return count;
  },
  deleteAllByUser: async (userId) => {
    const count = await Project.destroy({ where: { userId } });
    return count;
  },
};

module.exports = dbService;
