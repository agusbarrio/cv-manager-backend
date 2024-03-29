'use strict';
const { createEndpoint } = require('./expressConnector');
class DefaultRestController {
  constructor(moduleName) {
    this.moduleName = moduleName;
  }
  createEndpoint(method, path, middlewares = [], options) {
    createEndpoint(method, `/${this.moduleName}${path}`, middlewares, options);
  }
}

module.exports = DefaultRestController;
