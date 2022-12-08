'use strict';
const { dbConnector } = require('../../core');
const { createModel, DataTypes } = dbConnector;

class DbModel {
  Model = createModel(
    'User',
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
    { tableName: 'users' }
  );

  associate(models) {}
}

module.exports = DbModel;
