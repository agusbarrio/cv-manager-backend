'use strict';

const {
  TABLE_NAME,
  MODEL_ATTRIBUTES: { ID, TITLE, CONTACT_ID, INTRO_ID, USER_ID },
} = require('../modules/resumes/constants');
const _ = require('lodash');
const {
  TABLE_NAME: USERS_TABLE_NAME,
  MODEL_ATTRIBUTES: USER_MODEL_ATTRIBUTES,
} = require('../modules/users/constants');
const {
  TABLE_NAME: INTROS_TABLE_NAME,
  MODEL_ATTRIBUTES: INTRO_MODEL_ATTRIBUTES,
} = require('../modules/intros/constants');
const {
  TABLE_NAME: CONTACTS_TABLE_NAME,
  MODEL_ATTRIBUTES: CONTACT_MODEL_ATTRIBUTES,
} = require('../modules/contacts/constants');
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
      [INTRO_ID.key]: {
        type: Sequelize.INTEGER,
        references: {
          model: INTROS_TABLE_NAME,
          key: INTRO_MODEL_ATTRIBUTES.ID,
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      [CONTACT_ID.key]: {
        type: Sequelize.INTEGER,
        references: {
          model: CONTACTS_TABLE_NAME,
          key: CONTACT_MODEL_ATTRIBUTES.ID.key,
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
