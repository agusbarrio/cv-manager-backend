'use strict';

const {
  TABLE_NAME,
  MODEL_ATTRIBUTES: { EXPERIENCE_ID, EDUCATION_ID },
} = require('../modules/projects/constants');
const _ = require('lodash');

const {
  TABLE_NAME: EXPERIENCES_TABLE_NAME,
  MODEL_ATTRIBUTES: EXPERIENCE_MODEL_ATTRIBUTES,
} = require('../modules/experiences/constants');
const {
  TABLE_NAME: EDUCATIONS_TABLE_NAME,
  MODEL_ATTRIBUTES: EDUCATION_MODEL_ATTRIBUTES,
} = require('../modules/educations/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      TABLE_NAME,
      EXPERIENCE_ID.key,
      Sequelize.INTEGER,
      {
        references: {
          model: EXPERIENCES_TABLE_NAME,
          key: EXPERIENCE_MODEL_ATTRIBUTES.ID,
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }
    );
    await queryInterface.addColumn(
      TABLE_NAME,
      EDUCATION_ID.key,
      Sequelize.INTEGER,
      {
        references: {
          model: EDUCATIONS_TABLE_NAME,
          key: EDUCATION_MODEL_ATTRIBUTES.ID.key,
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLE_NAME, EDUCATION_ID);
    await queryInterface.removeColumn(TABLE_NAME, EXPERIENCE_ID);
  },
};
