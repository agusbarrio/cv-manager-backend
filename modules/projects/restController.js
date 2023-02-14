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
    this.createEndpoint('delete', '/', this.deleteAll, {
      needToken: true,
    });
  }

  getAll = async (req, res, next, context) => {
    const userId = context.user.id;
    const experiences = await service.getAllByUser(userId);
    res.json(experiences);
  };

  createOne = async (req, res, next, context) => {
    const userId = context.user.id;
    const { name, startDate, endDate, description, url } = req.body;

    const schema = validator.createSchema({
      name: validator.name(),
      startDate: validator.date({ required: { value: true } }),
      endDate: validator.date(),
      description: validator.description({ required: { value: true } }),
      url: validator.url(),
    });

    const newItem = {
      name,
      startDate,
      endDate,
      description,
      url,
    };
    await validator.validate(schema, newItem);
    await service.createOneByUser(userId, newItem);
    res.ok();
  };

  editOne = async (req, res, next, context) => {
    const userId = context.user.id;
    const { id } = req.params;
    const { name, startDate, endDate, description, url } = req.body;

    const schema = validator.createSchema({
      id: validator.id(),
      name: validator.name(),
      startDate: validator.date({ required: { value: true } }),
      endDate: validator.date(),
      description: validator.description({ required: { value: true } }),
      url: validator.url(),
    });

    const data = await validator.validate(schema, {
      id,
      name,
      startDate,
      endDate,
      description,
      url,
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
    await validator.validate(schema, { id });
    await service.deleteOneByUser(id, userId);
    res.ok();
  };

  deleteAll = async (req, res, next, context) => {
    const userId = context.user.id;
    await service.deleteAllByUser(userId);
    res.ok();
  };
}

module.exports = RestController;
