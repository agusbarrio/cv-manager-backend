'use strict';
const { dbConnector } = require('../../core');
const _ = require('lodash');
const {
  MODEL_NAME,
  TABLE_NAME,
  MODEL_ATTRIBUTES: { TITLE, ID, RESUME_ID, USER_ID },
} = require('./constants');

const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {
      [ID.key]: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      [TITLE.key]: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {
    models.Apikey.belongsTo(models.User, {
      as: 'user',
      foreignKey: USER_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    models.Apikey.belongsTo(models.Resume, {
      as: 'resume',
      foreignKey: RESUME_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = DbModel;
