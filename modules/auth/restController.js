'use strict';
const { DefaultRestController } = require('../../core');
const validator = require('../utils/validator');
const service = require('./service');

class RestController extends DefaultRestController {
  constructor(moduleName) {
    super(moduleName);
    this.createEndpoint('post', '/register', this.register);
  }

  register = async (req, res, next) => {
    const { email, password } = req.body;
    const schema = validator.createSchema({
      email: validator.email(),
      password: validator.password(),
    });
    await validator.validate(schema, { email, password });
    const result = await service.register({ email, password });
    this.sendJSON(res, result);
  };
}

module.exports = RestController;
