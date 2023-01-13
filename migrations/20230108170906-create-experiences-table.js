'use strict';

const {
  EMPLOYMENT_TYPES,
  TABLE_NAME,
  MODEL_ATTRIBUTES: {
    ID,
    TITLE,
    COMPANY_NAME,
    LOCATION,
    START_DATE,
    END_DATE,
    INDUSTRY,
    DESCRIPTION,
    EMPLOYMENT_TYPE,
    USER_ID,
  },
} = require('../modules/experiences/constants');
const _ = require('lodash');
const {
  TABLE_NAME: USERS_TABLE_NAME,
  MODEL_ATTRIBUTES: USER_MODEL_ATTRIBUTES,
} = require('../modules/users/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable(TABLE_NAME, {
      [ID]: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      [USER_ID]: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: USERS_TABLE_NAME,
          key: USER_MODEL_ATTRIBUTES.ID,
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      [TITLE]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [COMPANY_NAME]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [LOCATION]: {
        type: Sequelize.STRING,
      },
      [START_DATE]: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      [END_DATE]: {
        type: Sequelize.DATEONLY,
      },
      [INDUSTRY]: {
        type: Sequelize.STRING,
      },
      [DESCRIPTION]: {
        type: Sequelize.STRING,
      },
      [EMPLOYMENT_TYPE]: {
        type: Sequelize.ENUM(_.values(EMPLOYMENT_TYPES)),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable(TABLE_NAME);
  },
};
