'use strict';

const {
  TABLE_NAME,
  MODEL_ATTRIBUTES: { ID, EMAIL, PASSWORD },
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
      [EMAIL.key]: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      [PASSWORD.key]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
