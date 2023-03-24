'use strict';
const { dbConnector } = require('../../core');
const _ = require('lodash');
const {
  EMPLOYMENT_TYPES,
  MODEL_NAME,
  TABLE_NAME,
  MODEL_ATTRIBUTES: {
    TITLE,
    COMPANY_NAME,
    LOCATION,
    START_DATE,
    END_DATE,
    INDUSTRY,
    DESCRIPTION,
    EMPLOYMENT_TYPE,
    IMG_SRC,
    USER_ID,
  },
} = require('./constants');
const {
  MODEL_ATTRIBUTES: RESUME_EXPERIENCE_MODEL_ATTRIBUTES,
} = require('../resumeExperiences/constants');
const {
  MODEL_ATTRIBUTES: EXPERIENCE_SKILL_MODEL_ATTRIBUTES,
} = require('../experienceSkills/constants');
const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {
      [TITLE.key]: { type: DataTypes.STRING, allowNull: false },
      [COMPANY_NAME.key]: DataTypes.STRING,
      [LOCATION.key]: DataTypes.STRING,
      [START_DATE.key]: DataTypes.DATEONLY,
      [END_DATE.key]: DataTypes.DATEONLY,
      [INDUSTRY.key]: DataTypes.STRING,
      [DESCRIPTION.key]: DataTypes.STRING,
      [EMPLOYMENT_TYPE.key]: DataTypes.ENUM(_.values(EMPLOYMENT_TYPES)),
      [IMG_SRC.key]: { type: DataTypes.STRING(IMG_SRC.max) },
    },
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {
    models.Experience.belongsTo(models.User, {
      as: 'user',
      foreignKey: USER_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Experience.belongsToMany(models.Resume, {
      as: 'resumes',
      through: models.ResumeExperience,
      foreignKey: RESUME_EXPERIENCE_MODEL_ATTRIBUTES.EXPERIENCE_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Experience.belongsToMany(models.Skill, {
      as: 'skills',
      through: models.ExperienceSkill,
      foreignKey: EXPERIENCE_SKILL_MODEL_ATTRIBUTES.EXPERIENCE_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = DbModel;
