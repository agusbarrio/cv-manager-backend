'use strict';
const { Sequelize, DataTypes, Op, fn } = require('sequelize');
const { envConfig } = require('../config');

class SequelizeConnector {
  constructor() {
    this.models = {};
  }

  createModel = (table, model, options) => {
    const Model = this.sequelize.define(table, model, {
      freezeTableName: true,
      ...options,
    });

    this.models[Model.name] = Model;
    return Model;
  };
  connectDb = () => {
    return new Promise((resolve, reject) => {
      try {
        console.log(`Trying to connect DB: ${envConfig.MYSQL_CONNECTION}`);
        this.sequelize = new Sequelize(envConfig.MYSQL_CONNECTION, {
          logging: envConfig.MYSQL_LOGGING
            ? (query) =>
                console.log(query, '\n-------------------------------\n')
            : false,
          freezeTableName: true,
        });
        resolve();
      } catch (e) {
        console.log(`Error:`, e);
        reject();
      }
    });
  };
  DataTypes = DataTypes;
  Op = Op;
  Fn = fn;
  Col = Sequelize.col;
  Where = Sequelize.where;
}

let sequelize;
const models = {};

/**
 *
 * @param {String} table
 * @param {Object} model
 * @param {Object} options
 * @returns
 */
/* function createModel(table, model, options) {
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
        logging: envConfig.MYSQL_LOGGING ? console.log : false,
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
  sequelize,
  Op,
  Fn: fn,
  Col: Sequelize.col,
  Where: Sequelize.where,
};
 */

module.exports = new SequelizeConnector();
