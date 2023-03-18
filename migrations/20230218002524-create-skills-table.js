'use strict';

const {
  TABLE_NAME,
  MODEL_ATTRIBUTES: { ID, NAME, USER_ID },
} = require('../modules/skills/constants');
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
          key: USER_MODEL_ATTRIBUTES.ID.key,
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      [NAME.key]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
