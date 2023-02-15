'use strict';
const { DefaultRestController } = require('../../core');
const service = require('./service');
const validator = require('../utils/validator');
const _ = require('lodash');
const { EMPLOYMENT_TYPES } = require('./constants');

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
    const {
      title,
      companyName,
      location,
      startDate,
      endDate,
      industry,
      description,
      employmentType,
    } = req.body;

    const schema = validator.createSchema({
      title: validator.title(),
      companyName: validator.title(),
      location: validator.title({
        required: { value: false },
      }),
      startDate: validator.date({ required: { value: true } }),
      endDate: validator.date(),
      industry: validator.title({ required: { value: false } }),
      description: validator.description(),
      employmentType: validator.oneOf([..._.values(EMPLOYMENT_TYPES), null]),
    });

    const newItem = {
      title,
      companyName,
      location,
      startDate,
      endDate,
      industry,
      description,
      employmentType,
    };
    await validator.validate(schema, newItem);
    await service.createOneByUser(userId, newItem);
    res.ok();
  };

  editOne = async (req, res, next, context) => {
    const userId = context.user.id;
    const { id } = req.params;
    const {
      title,
      companyName,
      location,
      startDate,
      endDate,
      industry,
      description,
      employmentType,
    } = req.body;

    const schema = validator.createSchema({
      id: validator.id(),
      title: validator.title(),
      companyName: validator.title(),
      location: validator.title({
        required: { value: false },
      }),
      startDate: validator.date({ required: { value: true } }),
      endDate: validator.date(),
      industry: validator.title({ required: { value: false } }),
      description: validator.description(),
      employmentType: validator.oneOf([..._.values(EMPLOYMENT_TYPES), null]),
    });

    const data = await validator.validate(schema, {
      id,
      title,
      companyName,
      location,
      startDate,
      endDate,
      industry,
      description,
      employmentType,
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
