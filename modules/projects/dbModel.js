'use strict';
const { dbConnector } = require('../../core');
const _ = require('lodash');
const {
  MODEL_NAME,
  TABLE_NAME,
  MODEL_ATTRIBUTES: { NAME, START_DATE, END_DATE, DESCRIPTION, URL, USER_ID },
} = require('./constants');
const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {
      [NAME.key]: { type: DataTypes.STRING, allowNull: false },
      [START_DATE.key]: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      [END_DATE.key]: DataTypes.DATEONLY,
      [DESCRIPTION.key]: DataTypes.STRING,
      [URL.key]: DataTypes.STRING(URL.max),
    },
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {
    models.Project.belongsTo(models.User, {
      as: 'user',
      foreignKey: USER_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = DbModel;
