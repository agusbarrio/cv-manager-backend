'use strict';
const {
  dbConnector: {
    models: { Experience, Skill },
  },
  ERRORS,
} = require('../../core');
const _ = require('lodash');
const utilsService = require('../utils/service');
const dbService = {
  getAllByUser: async (userId, attributes) => {
    const experiences = await Experience.findAll({
      where: { userId },
      attributes,
      include: [{ model: Skill, as: 'skills' }],
    });
    return experiences;
  },
  editOneByUser: async (id, userId, { skillsIds = [], ...newItem }) => {
    const experience = await Experience.findOne({ where: { id, userId } });
    utilsService.updateObj(experience, newItem);
    await Promise.all([experience.setSkills(skillsIds), experience.save()]);
    return experience;
  },
  createOneByUser: async (userId, { skillsIds = [], ...newItem }) => {
    const createdItem = await Experience.create({ ...newItem, userId });
    if (!_.isEmpty(skillsIds)) await createdItem.setSkills(skillsIds);
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
