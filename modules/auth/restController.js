'use strict';
const { DefaultRestController } = require('../../core');
const validator = require('../utils/validator');
const { TOKEN_COOKIE_NAME } = require('./constants');
const service = require('./service');

class RestController extends DefaultRestController {
  constructor(moduleName) {
    super(moduleName);
    this.createEndpoint('post', '/register', this.register);
    this.createEndpoint('post', '/login', this.login);
    this.createEndpoint('post', '/logout', this.logout);
    this.createEndpoint(
      'post',
      '/requestPasswordRecovery',
      this.requestPasswordRecovery
    );
    this.createEndpoint('post', '/resetPassword', this.resetPassword);
  }

  register = async (req, res, next) => {
    const { email, password } = req.body;
    const schema = validator.createSchema({
      email: validator.email(),
      password: validator.password(),
    });
    await validator.validate(schema, { email, password });
    await service.register({ email, password });
    res.ok();
  };

  login = async (req, res, next, context) => {
    const { email, password } = req.body;
    const schema = validator.createSchema({
      email: validator.email(),
      password: validator.text(),
    });
    await validator.validate(schema, { email, password });
    const token = await service.login({ email, password });
    res.setCookie(TOKEN_COOKIE_NAME, token);
    res.ok();
  };

  logout = async (req, res, next, context) => {
    res.clearCookie(TOKEN_COOKIE_NAME);
    res.ok();
  };

  requestPasswordRecovery = async (req, res, next, context) => {
    const { email } = req.body;
    const schema = validator.createSchema({
      email: validator.email(),
    });
    await validator.validate(schema, { email });
    await service.requestPasswordRecovery({ email });
    res.ok();
  };

  resetPassword = async (req, res, next, context) => {
    const { password, token } = req.body;
    const schema = validator.createSchema({
      password: validator.password(),
      token: validator.string(),
    });
    await validator.validate(schema, { password, token });
    await service.resetPassword({ password, token });
    res.ok();
  };
}

module.exports = RestController;
