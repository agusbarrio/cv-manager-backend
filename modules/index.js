'use strict';
const { glob } = require('glob');
const _ = require('lodash');
const dirname = __dirname.split('\\').join('/');

/**
 * Function that imports the classes from the files that match the path specified in the genericPath parameter and generates an instance of each
 * @param {String} genericPath
 * @param {Function} callback
 */
async function instanceAll(genericPath) {
  const paths = glob.sync(genericPath);
  const instances = [];
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const Module = require(path);
    let names = path.split('/');
    names.pop();
    const moduleName = names.pop();
    instances.push(new Module(moduleName));
  }
  return instances;
}

async function initRestControllers() {
  const restControllerGenericPath = dirname + '/**/restController.js';
  await instanceAll(restControllerGenericPath);
}

async function initDbModels() {
  const dbModelGenericPath = dirname + '/**/dbModel.js';
  const dbModels = await instanceAll(dbModelGenericPath);
  const modelsMap = dbModels.reduce((obj, item) => {
    obj[item.Model.name] = item.Model;
    return obj;
  }, {});
  dbModels.forEach((dbModel) => {
    if (dbModel.associate) dbModel.associate(modelsMap);
  });
}

module.exports = { initRestControllers, initDbModels };
