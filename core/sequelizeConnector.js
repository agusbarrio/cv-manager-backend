'use strict';
const { Sequelize, DataTypes, Op, fn } = require('sequelize');
const { envConfig } = require('../config');
const _ = require('lodash');
const ERRORS = require('./errors');

let sequelize;
const models = {};

/**
 *
 * @param {String} table
 * @param {Object} model
 * @param {Object} options
 * @returns
 */
function createModel(table, model, options) {
  const Model = sequelize.define(table, model, {
    freezeTableName: true,
    ...options,
  });

  models[Model.name] = Model;
  return Model;
}

function connectDb() {
  return new Promise(function (resolve, reject) {
    try {
      console.log(`Trying to connect DB: ${envConfig.MYSQL_CONNECTION}`);
      sequelize = new Sequelize(envConfig.MYSQL_CONNECTION, {
        logging: envConfig.MYSQL_LOGGING === 'true' ? console.log : false,
        freezeTableName: true,
      });
      resolve();
    } catch (e) {
      console.log(`Error:`, e);
      reject();
    }
  });
}
module.exports = {
  models,
  connectDb,
  createModel,
  DataTypes,
  Op,
  Fn: fn,
  Col: Sequelize.col,
  Where: Sequelize.where,
};
