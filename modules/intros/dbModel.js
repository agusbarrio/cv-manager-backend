'use strict';
const { dbConnector } = require('../../core');
const _ = require('lodash');
const {
  MODEL_NAME,
  TABLE_NAME,
  MODEL_ATTRIBUTES: {
    FIRST_NAME,
    LAST_NAME,
    HEAD_LINE,
    BIRTHDAY,
    ABOUT,
    IMG_SRC,
    USER_ID,
  },
} = require('./constants');
const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {
      [FIRST_NAME.key]: { type: DataTypes.STRING, allowNull: false },
      [LAST_NAME.key]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      [HEAD_LINE.key]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      [BIRTHDAY.key]: DataTypes.DATEONLY,
      [ABOUT.key]: DataTypes.STRING,
      [IMG_SRC.key]: { type: DataTypes.STRING(IMG_SRC.max) },
    },
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {
    models.Intro.belongsTo(models.User, {
      as: 'user',
      foreignKey: USER_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = DbModel;
