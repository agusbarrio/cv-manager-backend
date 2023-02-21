'use strict';
const { dbConnector } = require('../../core');
const _ = require('lodash');
const { MODEL_NAME, TABLE_NAME } = require('./constants');
const { createModel } = dbConnector;

class DbModel {
  Model = createModel(
    MODEL_NAME,
    {},
    { tableName: TABLE_NAME, timestamps: false }
  );

  associate(models) {}
}

module.exports = DbModel;
