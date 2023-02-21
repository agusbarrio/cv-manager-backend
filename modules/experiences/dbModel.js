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
  },
} = require('./constants');
const {
  MODEL_ATTRIBUTES: RESUME_EXPERIENCE_MODEL_ATTRIBUTES,
} = require('../resumeExperiences/constants');
const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {
      [TITLE]: { type: DataTypes.STRING, allowNull: false },
      [COMPANY_NAME]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      [LOCATION]: DataTypes.STRING,
      [START_DATE]: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      [END_DATE]: DataTypes.DATEONLY,
      [INDUSTRY]: DataTypes.STRING,
      [DESCRIPTION]: DataTypes.STRING,
      [EMPLOYMENT_TYPE]: DataTypes.ENUM(_.values(EMPLOYMENT_TYPES)),
    },
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {
    models.Experience.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
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
  }
}

module.exports = DbModel;
