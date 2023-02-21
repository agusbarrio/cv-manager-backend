'use strict';
const { dbConnector } = require('../../core');
const _ = require('lodash');
const { MODEL_NAME, TABLE_NAME, MODEL_ATTRIBUTES } = require('./constants');

const { createModel } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {},
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {
    models.ResumeExperience.belongsTo(models.Resume, {
      as: 'resume',
      foreignKey: MODEL_ATTRIBUTES.RESUME_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.ResumeExperience.belongsTo(models.Experience, {
      as: 'experience',
      foreignKey: MODEL_ATTRIBUTES.EXPERIENCE_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = DbModel;
