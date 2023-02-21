'use strict';
const { dbConnector } = require('../../core');
const _ = require('lodash');
const {
  MODEL_NAME,
  TABLE_NAME,
  MODEL_ATTRIBUTES: { NAME, USER_ID },
} = require('./constants');
const {
  MODEL_ATTRIBUTES: RESUME_SKILL_MODEL_ATTRIBUTES,
} = require('../resumeSkills/constants');
const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {
      [NAME.key]: { type: DataTypes.STRING, allowNull: false },
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
  }
}

module.exports = DbModel;
