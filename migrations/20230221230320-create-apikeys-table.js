'use strict';

const {
  TABLE_NAME,
  MODEL_ATTRIBUTES: { ID, RESUME_ID, TITLE, USER_ID },
} = require('../modules/apikeys/constants');
const _ = require('lodash');
const {
  TABLE_NAME: USERS_TABLE_NAME,
  MODEL_ATTRIBUTES: USER_MODEL_ATTRIBUTES,
} = require('../modules/users/constants');
const {
  TABLE_NAME: RESUMES_TABLE_NAME,
  MODEL_ATTRIBUTES: RESUME_MODEL_ATTRIBUTES,
} = require('../modules/resumes/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      [ID.key]: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      [TITLE.key]: {
        type: Sequelize.STRING,
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
      [RESUME_ID.key]: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: RESUMES_TABLE_NAME,
          key: RESUME_MODEL_ATTRIBUTES.ID.key,
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
