'use strict';
const { createEndpoint, sendJSON, sendMessage } = require('./expressConnector');
class DefaultRestController {
  constructor(moduleName) {
    this.moduleName = moduleName;
  }
  createEndpoint(method, path, middlewares = []) {
    createEndpoint(method, `/${this.moduleName}${path}`, middlewares);
  }
  sendJSON = sendJSON;
  sendMessage = sendMessage;
}

module.exports = DefaultRestController;
