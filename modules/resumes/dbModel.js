'use strict';
const { dbConnector } = require('../../core');
const _ = require('lodash');
const {
  MODEL_NAME,
  TABLE_NAME,
  MODEL_ATTRIBUTES: { CONTACT_ID, INTRO_ID, USER_ID, TITLE },
} = require('./constants');
const {
  MODEL_ATTRIBUTES: RESUME_EXPERIENCE_MODEL_ATTRIBUTES,
} = require('../resumeExperiences/constants');
const {
  MODEL_ATTRIBUTES: RESUME_PROJECT_MODEL_ATTRIBUTES,
} = require('../resumeProjects/constants');
const {
  MODEL_ATTRIBUTES: RESUME_EDUCATION_MODEL_ATTRIBUTES,
} = require('../resumeEducations/constants');
const {
  MODEL_ATTRIBUTES: RESUME_SKILL_MODEL_ATTRIBUTES,
} = require('../resumeSkills/constants');

const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {
      [TITLE.key]: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {
    models.Resume.belongsTo(models.User, {
      as: 'user',
      foreignKey: USER_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Resume.belongsTo(models.Contact, {
      as: 'contact',
      foreignKey: CONTACT_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Resume.belongsTo(models.Intro, {
      as: 'intro',
      foreignKey: INTRO_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    //Experience
    models.Resume.belongsToMany(models.Experience, {
      as: 'experiences',
      through: models.ResumeExperience,
      foreignKey: RESUME_EXPERIENCE_MODEL_ATTRIBUTES.RESUME_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Resume.hasMany(models.ResumeExperience, {
      as: 'resumeExperiences',
      foreignKey: RESUME_EXPERIENCE_MODEL_ATTRIBUTES.RESUME_ID.key,
    });

    //Project
    models.Resume.belongsToMany(models.Project, {
      as: 'projects',
      through: models.ResumeProject,
      foreignKey: RESUME_PROJECT_MODEL_ATTRIBUTES.RESUME_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Resume.hasMany(models.ResumeProject, {
      as: 'resumeProjects',
      foreignKey: RESUME_PROJECT_MODEL_ATTRIBUTES.RESUME_ID.key,
    });

    //Education
    models.Resume.belongsToMany(models.Education, {
      as: 'educations',
      through: models.ResumeEducation,
      foreignKey: RESUME_EDUCATION_MODEL_ATTRIBUTES.RESUME_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Resume.hasMany(models.ResumeEducation, {
      as: 'resumeEducations',
      foreignKey: RESUME_EDUCATION_MODEL_ATTRIBUTES.RESUME_ID.key,
    });

    //Skill
    models.Resume.belongsToMany(models.Skill, {
      as: 'skills',
      through: models.ResumeSkill,
      foreignKey: RESUME_SKILL_MODEL_ATTRIBUTES.RESUME_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Resume.hasMany(models.ResumeSkill, {
      as: 'resumeSkills',
      foreignKey: RESUME_SKILL_MODEL_ATTRIBUTES.RESUME_ID.key,
    });
  }
}

module.exports = DbModel;
