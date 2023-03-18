'use strict';
const {
  TABLE_NAME: EDUCATIONS_TABLE_NAME,
  MODEL_ATTRIBUTES: EDUCATION_MODEL_ATTRIBUTES,
} = require('../modules/educations/constants');
const {
  TABLE_NAME: EXPERIENCES_TABLE_NAME,
  MODEL_ATTRIBUTES: EXPERIENCE_MODEL_ATTRIBUTES,
} = require('../modules/experiences/constants');
const {
  TABLE_NAME: INTROS_TABLE_NAME,
  MODEL_ATTRIBUTES: INTRO_MODEL_ATTRIBUTES,
} = require('../modules/intros/constants');
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
    await queryInterface.addColumn(
      EDUCATIONS_TABLE_NAME,
      EDUCATION_MODEL_ATTRIBUTES.IMG_SRC.key,
      Sequelize.STRING(EDUCATION_MODEL_ATTRIBUTES.IMG_SRC.max)
    );
    await queryInterface.addColumn(
      EXPERIENCES_TABLE_NAME,
      EXPERIENCE_MODEL_ATTRIBUTES.IMG_SRC.key,
      Sequelize.STRING(EXPERIENCE_MODEL_ATTRIBUTES.IMG_SRC.max)
    );
    await queryInterface.addColumn(
      INTROS_TABLE_NAME,
      INTRO_MODEL_ATTRIBUTES.IMG_SRC.key,
      Sequelize.STRING(INTRO_MODEL_ATTRIBUTES.IMG_SRC.max)
    );
    await queryInterface.addColumn(
      PROJECTS_TABLE_NAME,
      PROJECT_MODEL_ATTRIBUTES.IMG_SRC.key,
      Sequelize.STRING(PROJECT_MODEL_ATTRIBUTES.IMG_SRC.max)
    );
    await queryInterface.addColumn(
      SKILLS_TABLE_NAME,
      SKILL_MODEL_ATTRIBUTES.IMG_SRC.key,
      Sequelize.STRING(SKILL_MODEL_ATTRIBUTES.IMG_SRC.max)
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      EDUCATIONS_TABLE_NAME,
      EDUCATION_MODEL_ATTRIBUTES.IMG_SRC.key
    );
    await queryInterface.removeColumn(
      EXPERIENCES_TABLE_NAME,
      EXPERIENCE_MODEL_ATTRIBUTES.IMG_SRC.key
    );
    await queryInterface.removeColumn(
      INTROS_TABLE_NAME,
      INTRO_MODEL_ATTRIBUTES.IMG_SRC.key
    );
    await queryInterface.removeColumn(
      PROJECTS_TABLE_NAME,
      PROJECT_MODEL_ATTRIBUTES.IMG_SRC.key
    );
    await queryInterface.removeColumn(
      SKILLS_TABLE_NAME,
      SKILL_MODEL_ATTRIBUTES.IMG_SRC.key
    );
  },
};
