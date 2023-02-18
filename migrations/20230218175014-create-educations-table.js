'use strict';

const {
  TABLE_NAME,
  MODEL_ATTRIBUTES: {
    ID,
    SCHOOL,
    DEGREE,
    FIELD_OF_STUDY,
    START_DATE,
    END_DATE,
    GRADE,
    ACTIVITIES,
    DESCRIPTION,
    USER_ID,
  },
} = require('../modules/educations/constants');
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
      [SCHOOL.key]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [DEGREE.key]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [FIELD_OF_STUDY.key]: {
        type: Sequelize.STRING,
      },
      [START_DATE.key]: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      [END_DATE.key]: { type: Sequelize.DATEONLY },
      [GRADE.key]: { type: Sequelize.STRING },
      [ACTIVITIES.key]: { type: Sequelize.STRING },
      [DESCRIPTION.key]: { type: Sequelize.STRING },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
