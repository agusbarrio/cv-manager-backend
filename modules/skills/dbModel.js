'use strict';
const { dbConnector } = require('../../core');
const _ = require('lodash');
const {
  MODEL_NAME,
  TABLE_NAME,
  MODEL_ATTRIBUTES: { NAME, IMG_SRC, USER_ID },
} = require('./constants');
const {
  MODEL_ATTRIBUTES: RESUME_SKILL_MODEL_ATTRIBUTES,
} = require('../resumeSkills/constants');
const {
  MODEL_ATTRIBUTES: PROJECT_SKILL_MODEL_ATTRIBUTES,
} = require('../projectSkills/constants');
const {
  MODEL_ATTRIBUTES: EDUCATION_SKILL_MODEL_ATTRIBUTES,
} = require('../educationSkills/constants');
const {
  MODEL_ATTRIBUTES: EXPERIENCE_SKILL_MODEL_ATTRIBUTES,
} = require('../experienceSkills/constants');

const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {
      [NAME.key]: { type: DataTypes.STRING, allowNull: false },
      [IMG_SRC.key]: { type: DataTypes.STRING(IMG_SRC.max) },
    },
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {
    models.Skill.belongsTo(models.User, {
      as: 'user',
      foreignKey: USER_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Skill.belongsToMany(models.Resume, {
      as: 'resumes',
      through: models.ResumeSkill,
      foreignKey: RESUME_SKILL_MODEL_ATTRIBUTES.SKILL_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Skill.belongsToMany(models.Project, {
      as: 'projects',
      through: models.ProjectSkill,
      foreignKey: PROJECT_SKILL_MODEL_ATTRIBUTES.SKILL_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Skill.belongsToMany(models.Experience, {
      as: 'experiences',
      through: models.ExperienceSkill,
      foreignKey: EXPERIENCE_SKILL_MODEL_ATTRIBUTES.SKILL_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Skill.belongsToMany(models.Education, {
      as: 'educations',
      through: models.EducationSkill,
      foreignKey: EDUCATION_SKILL_MODEL_ATTRIBUTES.SKILL_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = DbModel;
