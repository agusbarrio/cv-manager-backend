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
    const result = await service.getAllByUser(userId);
    res.json(result);
  };

  createOne = async (req, res, next, context) => {
    const userId = context.user.id;
    const {
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      activities,
      description,
    } = req.body;

    const schema = validator.createSchema({
      school: validator.title(),
      degree: validator.title(),
      fieldOfStudy: validator.name({ required: { value: false } }),
      startDate: validator.date({ required: { value: true } }),
      endDate: validator.date(),
      grade: validator.name({ required: { value: false } }),
      activities: validator.description(),
      description: validator.description(),
    });

    const newItem = {
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      activities,
      description,
    };
    await validator.validate(schema, newItem);
    await service.createOneByUser(userId, newItem);
    res.ok();
  };

  editOne = async (req, res, next, context) => {
    const userId = context.user.id;
    const { id } = req.params;
    const {
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      activities,
      description,
    } = req.body;

    const schema = validator.createSchema({
      id: validator.id(),
      school: validator.title(),
      degree: validator.title(),
      fieldOfStudy: validator.name({ required: { value: false } }),
      startDate: validator.date({ required: { value: true } }),
      endDate: validator.date(),
      grade: validator.name({ required: { value: false } }),
      activities: validator.description(),
      description: validator.description(),
    });

    const data = await validator.validate(schema, {
      id,
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      activities,
      description,
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
