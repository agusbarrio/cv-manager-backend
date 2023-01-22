'use strict';
const { dbConnector } = require('../../core');
const _ = require('lodash');
const {
  MODEL_NAME,
  TABLE_NAME,
  MODEL_ATTRIBUTES: { FIRST_NAME, LAST_NAME, HEAD_LINE, BIRTHDAY, ABOUT },
} = require('./constants');
const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {
      [FIRST_NAME]: { type: DataTypes.STRING, allowNull: false },
      [LAST_NAME]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      [HEAD_LINE]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      [BIRTHDAY]: DataTypes.DATEONLY,
      [ABOUT]: DataTypes.STRING,
    },
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {
    models.Intro.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = DbModel;
