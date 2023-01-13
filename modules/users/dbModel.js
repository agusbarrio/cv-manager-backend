'use strict';
const { dbConnector } = require('../../core');
const { MODEL_NAME, TABLE_NAME } = require('./constants');
const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {}
}

module.exports = DbModel;
