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
  Model.updateOne = async ({ findOptions, saveOptions, newItem }) =>
    await updateOne({ Model, findOptions, saveOptions, newItem });

  models[Model.name] = Model;
  return Model;
}

async function updateOne({
  Model,
  newItem,
  findOptions = {},
  saveOptions = {},
}) {
  const entity = await Model.findOne(findOptions);
  if (!entity) throw ERRORS.E404;
  const keys = _.keys(newItem);
  const modelAttributes = _.keys(Model.tableAttributes);
  const keysToUpdate = _.filter(
    keys,
    (k) => modelAttributes.includes(k) && entity[k] !== newItem[k]
  );

  if (keysToUpdate.length > 0) {
    _.forEach(keysToUpdate, (k) => {
      entity[k] = newItem[k];
    });
    await entity.save(saveOptions);
  }

  return entity;
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
