'use strict';
const {
  dbConnector: {
    models: { Project, Skill },
  },
} = require('../../core');
const _ = require('lodash');
const utilsService = require('../utils/service');

const dbService = {
  getAllByUser: async (userId, attributes) => {
    const projects = await Project.findAll({
      where: { userId },
      attributes,
      include: [{ model: Skill, as: 'skills' }],
    });
    return projects;
  },
  editOneByUser: async (id, userId, { skillsIds = [], ...newItem }) => {
    const project = await Project.findOne({ where: { id, userId } });
    utilsService.updateObj(project, newItem);
    await Promise.all([project.setSkills(skillsIds), project.save()]);
    return project;
  },
  createOneByUser: async (userId, { skillsIds = [], ...newItem }) => {
    const createdItem = await Project.create({ ...newItem, userId });
    if (!_.isEmpty(skillsIds)) await createdItem.setSkills(skillsIds);
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
