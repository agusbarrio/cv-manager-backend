'use strict';
const {
  TABLE_NAME,
  MODEL_ATTRIBUTES: {
    ID,
    USER_ID,
    FIRST_NAME,
    LAST_NAME,
    HEAD_LINE,
    BIRTHDAY,
    ABOUT,
  },
} = require('../modules/intros/constants');
const {
  TABLE_NAME: USERS_TABLE_NAME,
  MODEL_ATTRIBUTES: USER_MODEL_ATTRIBUTES,
} = require('../modules/users/constants');
const _ = require('lodash');

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
          key: USER_MODEL_ATTRIBUTES.ID.key,
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      [FIRST_NAME.key]: {
        type: Sequelize.STRING,
      },
      [LAST_NAME.key]: {
        type: Sequelize.STRING,
      },
      [HEAD_LINE.key]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [BIRTHDAY.key]: Sequelize.DATEONLY,
      [ABOUT.key]: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
