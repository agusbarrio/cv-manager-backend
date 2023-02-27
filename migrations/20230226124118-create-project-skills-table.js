'use strict';
const {
  TABLE_NAME,
  MODEL_ATTRIBUTES: { ID, PROJECT_ID, SKILL_ID },
} = require('../modules/projectSkills/constants');
const {
  TABLE_NAME: PROJECTS_TABLE_NAME,
  MODEL_ATTRIBUTES: PROJECT_MODEL_ATTRIBUTES,
} = require('../modules/projects/constants');
const {
  TABLE_NAME: SKILLS_TABLE_NAME,
  MODEL_ATTRIBUTES: SKILL_MODEL_ATTRIBUTES,
} = require('../modules/skills/constants');

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
      [PROJECT_ID.key]: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: PROJECTS_TABLE_NAME,
          key: PROJECT_MODEL_ATTRIBUTES.ID.key,
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      [SKILL_ID.key]: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: SKILLS_TABLE_NAME,
          key: SKILL_MODEL_ATTRIBUTES.ID.key,
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
