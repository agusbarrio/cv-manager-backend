'use strict';
const { DefaultRestController } = require('../../core');
const service = require('./service');
const validator = require('../utils/validator');
const _ = require('lodash');

class RestController extends DefaultRestController {
  constructor(moduleName) {
    super(moduleName);
    this.createEndpoint('get', '/', this.getAll, {
      needToken: true,
    });
    this.createEndpoint('post', '/', this.createOne, {
      needToken: true,
    });
    this.createEndpoint('put', '/:id', this.editOne, {
      needToken: true,
    });
    this.createEndpoint('delete', '/:id', this.deleteOne, {
      needToken: true,
    });
  }

  getAll = async (req, res, next, context) => {
    const userId = context.user.id;
    const intros = await service.getAllByUser(userId);
    res.json(intros);
  };

  createOne = async (req, res, next, context) => {
    const userId = context.user.id;
    const { firstName, lastName, headLine, birthday, about } = req.body;

    const schema = validator.createSchema({
      firstName: validator.name(),
      lastName: validator.name(),
      headLine: validator.title(),
      birthday: validator.date(),
      about: validator.description({ required: { value: false } }),
    });

    const data = await validator.validate(schema, {
      firstName,
      lastName,
      headLine,
      birthday,
      about,
    });

    await service.createOneByUser(userId, data);
    res.ok();
  };

  editOne = async (req, res, next, context) => {
    const userId = context.user.id;
    const { id } = req.params;
    const { firstName, lastName, headLine, birthday, about } = req.body;

    const schema = validator.createSchema({
      id: validator.id(),
      firstName: validator.name({ required: { value: false } }),
      lastName: validator.name({ required: { value: false } }),
      headLine: validator.title({ required: { value: false } }),
      birthday: validator.date({ required: { value: false } }),
      about: validator.description({ required: { value: false } }),
    });

    const data = await validator.validate(schema, {
      id,
      firstName,
      lastName,
      headLine,
      birthday,
      about,
    });

    await service.editOneByUser(data.id, userId, data);
    res.ok();
  };

  deleteOne = async (req, res, next, context) => {
    const userId = context.user.id;
    const { id } = req.params;
    const schema = validator.createSchema({
      id: validator.id(),
    });
    const data = await validator.validate(schema, { id });
    await service.deleteOneByUser(data.id, userId);
    res.ok();
  };
}

module.exports = RestController;