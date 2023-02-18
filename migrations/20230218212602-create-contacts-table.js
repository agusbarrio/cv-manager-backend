'use strict';

const {
  TABLE_NAME,
  MODEL_ATTRIBUTES: {
    ID,
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
} = require('../modules/contacts/constants');
const _ = require('lodash');
const {
  TABLE_NAME: USERS_TABLE_NAME,
  MODEL_ATTRIBUTES: USER_MODEL_ATTRIBUTES,
} = require('../modules/users/constants');
const { constants } = require('../core');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      [ID.key]: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      [USER_ID.key]: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: USERS_TABLE_NAME,
          key: USER_MODEL_ATTRIBUTES.ID,
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      [TITLE.key]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [LINKEDIN.key]: {
        type: Sequelize.STRING(LINKEDIN.max),
      },
      [FACEBOOK.key]: {
        type: Sequelize.STRING(FACEBOOK.max),
      },
      [TWITTER.key]: {
        type: Sequelize.STRING(TWITTER.max),
      },
      [EMAIL.key]: {
        type: Sequelize.STRING,
      },
      [PHONE.key]: { type: Sequelize.STRING },
      [MOBILE_PHONE.key]: { type: Sequelize.STRING },
      [ADDRESS.key]: { type: Sequelize.STRING },
      [GITHUB.key]: { type: Sequelize.STRING(GITHUB.max) },
      [COUNTRY.key]: { type: Sequelize.STRING },
      [POSTAL_CODE.key]: { type: Sequelize.STRING },
      [CITY.key]: { type: Sequelize.STRING },
      [WEBSITE.key]: { type: Sequelize.STRING(WEBSITE.max) },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
