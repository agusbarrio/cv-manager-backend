'use strict';

const {
  EMPLOYMENT_TYPES,
  TABLE_NAME,
  MODEL_ATTRIBUTES: {
    ID,
    NAME,
    START_DATE,
    END_DATE,
    DESCRIPTION,
    URL,
    USER_ID,
  },
} = require('../modules/projects/constants');
const _ = require('lodash');
const {
  TABLE_NAME: USERS_TABLE_NAME,
  MODEL_ATTRIBUTES: USER_MODEL_ATTRIBUTES,
} = require('../modules/users/constants');

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
      [NAME.key]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [START_DATE.key]: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      [END_DATE.key]: {
        type: Sequelize.DATEONLY,
      },
      [DESCRIPTION.key]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [URL.key]: {
        type: Sequelize.STRING(URL.max),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
