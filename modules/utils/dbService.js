'use strict';
const {
  dbConnector: {
    models: { Intro, Contact, Experience, Education, Skill, Project, Resume },
  },
  ERRORS,
  dbConnector,
} = require('../../core');
const _ = require('lodash');

const dbService = {
  getUserEntities: async (
    userId,
    {
      experiencesIds = null,
      contactsIds = null,
      educationsIds = null,
      projectsIds = null,
      introsIds = null,
      skillsIds = null,
      resumesIds = null,
    }
  ) => {
    const entities = await dbConnector.sequelize.query(
      `SELECT id FROM ${Intro.tableName} WHERE id IN (:introsIds) AND userId = :userId
      UNION ALL
      SELECT id FROM ${Contact.tableName} WHERE id  IN (:contactsIds) AND userId = :userId
      UNION ALL
      SELECT id FROM ${Experience.tableName} WHERE id IN (:experiencesIds) AND userId = :userId
      UNION ALL
      SELECT id FROM ${Education.tableName} WHERE id IN (:educationsIds) AND userId = :userId
      UNION ALL
      SELECT id FROM ${Skill.tableName} WHERE id IN (:skillsIds) AND userId = :userId
      UNION ALL
      SELECT id FROM ${Project.tableName} WHERE id IN (:projectsIds) AND userId = :userId
      UNION ALL
      SELECT id FROM ${Resume.tableName} WHERE id IN (:resumesIds) AND userId = :userId`,
      {
        replacements: {
          userId,
          experiencesIds,
          contactsIds,
          educationsIds,
          projectsIds,
          introsIds,
          skillsIds,
          resumesIds,
        },
        type: dbConnector.sequelize.QueryTypes.SELECT,
      }
    );

    return entities;
  },
};

module.exports = dbService;
