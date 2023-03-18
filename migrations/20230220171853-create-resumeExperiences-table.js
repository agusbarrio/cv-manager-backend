'use strict';
const {
  TABLE_NAME,
  MODEL_ATTRIBUTES: { ID, RESUME_ID, EXPERIENCE_ID },
} = require('../modules/resumeExperiences/constants');
const {
  TABLE_NAME: RESUMES_TABLE_NAME,
  MODEL_ATTRIBUTES: RESUME_MODEL_ATTRIBUTES,
} = require('../modules/resumes/constants');
const {
  TABLE_NAME: EXPERIENCES_TABLE_NAME,
  MODEL_ATTRIBUTES: EXPERIENCE_MODEL_ATTRIBUTES,
} = require('../modules/experiences/constants');
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
      [EXPERIENCE_ID.key]: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: EXPERIENCES_TABLE_NAME,
          key: EXPERIENCE_MODEL_ATTRIBUTES.ID.key,
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
