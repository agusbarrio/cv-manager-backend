'use strict';

const { DefaultRestController } = require('../../core');

class RestController extends DefaultRestController {
  constructor(moduleName) {
    super(moduleName);
    this.createEndpoint('get', '/hello', this.testHandler);
  }
  testHandler = (req, res, next) => {
    this.sendMessage(res, 'Hello world');
  };
}

module.exports = RestController;
