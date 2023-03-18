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
      [TITLE.key]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [COMPANY_NAME.key]: {
        type: Sequelize.STRING,
      },
      [LOCATION.key]: {
        type: Sequelize.STRING,
      },
      [START_DATE.key]: {
        type: Sequelize.DATEONLY,
      },
      [END_DATE.key]: {
        type: Sequelize.DATEONLY,
      },
      [INDUSTRY.key]: {
        type: Sequelize.STRING,
      },
      [DESCRIPTION.key]: {
        type: Sequelize.STRING,
      },
      [EMPLOYMENT_TYPE.key]: {
        type: Sequelize.ENUM(_.values(EMPLOYMENT_TYPES)),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
