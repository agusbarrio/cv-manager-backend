'use strict';
const { DefaultRestController } = require('../../core');
const validator = require('../utils/validator');
const { LOGIN_TOKEN_DURATION, TOKEN_COOKIE_NAME } = require('./constants');
const service = require('./service');

class RestController extends DefaultRestController {
  constructor(moduleName) {
    super(moduleName);
    this.createEndpoint('post', '/register', this.register);
    this.createEndpoint('post', '/login', this.login);
  }

  register = async (req, res, next) => {
    const { email, password } = req.body;
    const schema = validator.createSchema({
      email: validator.email(),
      password: validator.password(),
    });
    await validator.validate(schema, { email, password });
    const result = await service.register({ email, password });
    res.json(result);
  };

  login = async (req, res, next) => {
    const { email, password } = req.body;
    const schema = validator.createSchema({
      email: validator.email(),
      password: validator.string(),
    });
    await validator.validate(schema, { email, password });
    const token = await service.login({ email, password });
    res.cookie(TOKEN_COOKIE_NAME, token, {
      maxAge: LOGIN_TOKEN_DURATION,
      httpOnly: true,
    });
    res.json({ token });
  };
}

module.exports = RestController;
