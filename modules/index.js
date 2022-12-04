'use strict';
const { glob } = require('glob');
const path = require('path');

function initRestControllers() {
  const restControllerPath = path
    .normalize(__dirname + '/**/restController.js')
    .split('\\')
    .join('/');
  const paths = glob.sync(restControllerPath);
  paths.forEach((path) => {
    const module = require(path);
    let names = path.split('/');
    names.pop();
    const moduleName = names.pop();
    new module(moduleName);
  });
}

module.exports = { initRestControllers };
