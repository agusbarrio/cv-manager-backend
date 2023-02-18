'use strict';
const { dbConnector } = require('../../core');
const _ = require('lodash');
const {
  MODEL_NAME,
  TABLE_NAME,
  MODEL_ATTRIBUTES: {
    TITLE,
    LINKEDIN,
    FACEBOOK,
    TWITTER,
    EMAIL,
    PHONE,
    MOBILE_PHONE,
    ADDRESS,
    GITHUB,
    COUNTRY,
    POSTAL_CODE,
    CITY,
    WEBSITE,
    USER_ID,
  },
} = require('./constants');

const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {
      [TITLE.key]: { type: DataTypes.STRING, allowNull: false },
      [LINKEDIN.key]: { type: DataTypes.STRING(LINKEDIN.max) },
      [FACEBOOK.key]: { type: DataTypes.STRING(FACEBOOK.max) },
      [TWITTER.key]: { type: DataTypes.STRING(TWITTER.max) },
      [EMAIL.key]: { type: DataTypes.STRING },
      [PHONE.key]: { type: DataTypes.STRING },
      [MOBILE_PHONE.key]: { type: DataTypes.STRING },
      [ADDRESS.key]: { type: DataTypes.STRING },
      [GITHUB.key]: { type: DataTypes.STRING(GITHUB.max) },
      [COUNTRY.key]: { type: DataTypes.STRING },
      [POSTAL_CODE.key]: { type: DataTypes.STRING },
      [CITY.key]: { type: DataTypes.STRING },
      [WEBSITE.key]: { type: DataTypes.STRING(WEBSITE.max) },
    },
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {
    models.Contact.belongsTo(models.User, {
      as: 'user',
      foreignKey: USER_ID.key,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = DbModel;
