'use strict';
const {
  dbConnector: {
    models: { Education, Skill },
  },
} = require('../../core');
const _ = require('lodash');
const utilsService = require('../utils/service');

const dbService = {
  getAllByUser: async (userId, attributes) => {
    const result = await Education.findAll({
      where: { userId },
      attributes,
      include: [{ model: Skill, as: 'skills' }],
    });
    return result;
  },
  editOneByUser: async (id, userId, { skillsIds = [], ...newItem }) => {
    const education = await Education.findOne({ where: { id, userId } });
    utilsService.updateObj(education, newItem);
    await Promise.all([education.setSkills(skillsIds), education.save()]);
    return education;
  },
  createOneByUser: async (userId, { skillsIds = [], ...newItem }) => {
    const createdItem = await Education.create({ ...newItem, userId });
    if (!_.isEmpty(skillsIds)) await createdItem.setSkills(skillsIds);
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
