'use strict';
const { dbConnector } = require('../../core');
const _ = require('lodash');
const {
  MODEL_NAME,
  TABLE_NAME,
  MODEL_ATTRIBUTES: {
    SCHOOL,
    DEGREE,
    FIELD_OF_STUDY,
    START_DATE,
    END_DATE,
    GRADE,
    ACTIVITIES,
    DESCRIPTION,
    USER_ID,
  },
} = require('./constants');
const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {
      [SCHOOL.key]: { type: DataTypes.STRING, allowNull: false },
      [DEGREE.key]: { type: DataTypes.STRING, allowNull: false },
      [FIELD_OF_STUDY.key]: { type: DataTypes.STRING },
      [START_DATE.key]: { type: DataTypes.DATEONLY, allowNull: false },
      [END_DATE.key]: { type: DataTypes.DATEONLY },
      [GRADE.key]: { type: DataTypes.STRING },
      [ACTIVITIES.key]: { type: DataTypes.STRING },
      [DESCRIPTION.key]: { type: DataTypes.STRING },
    },
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {
    models.Education.belongsTo(models.User, {
      as: 'user',
      foreignKey: USER_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = DbModel;
