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
      title,
      linkedin,
      facebook,
      twitter,
      email,
      phone,
      mobilePhone,
      address,
      github,
      country,
      postalCode,
      city,
      website,
    } = req.body;

    const schema = validator.createSchema({
      title: validator.title(),
      linkedin: validator.url(),
      facebook: validator.url(),
      twitter: validator.url(),
      email: validator.email({ required: { value: false } }),
      phone: validator.name({ required: { value: false } }),
      mobilePhone: validator.name({ required: { value: false } }),
      address: validator.name({ required: { value: false } }),
      github: validator.url(),
      country: validator.name({ required: { value: false } }),
      postalCode: validator.name({ required: { value: false } }),
      city: validator.name({ required: { value: false } }),
      website: validator.url(),
    });

    const newItem = {
      title,
      linkedin,
      facebook,
      twitter,
      email,
      phone,
      address,
      github,
      country,
      postalCode,
      city,
      website,
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
      linkedin,
      facebook,
      twitter,
      email,
      phone,
      mobilePhone,
      address,
      github,
      country,
      postalCode,
      city,
      website,
    } = req.body;

    const schema = validator.createSchema({
      id: validator.id(),
      title: validator.title(),
      linkedin: validator.url(),
      facebook: validator.url(),
      twitter: validator.url(),
      email: validator.email({ required: { value: false } }),
      phone: validator.name({ required: { value: false } }),
      mobilePhone: validator.name({ required: { value: false } }),
      address: validator.name({ required: { value: false } }),
      github: validator.url(),
      country: validator.name({ required: { value: false } }),
      postalCode: validator.name({ required: { value: false } }),
      city: validator.name({ required: { value: false } }),
      website: validator.url(),
    });

    const data = await validator.validate(schema, {
      id,
      title,
      linkedin,
      facebook,
      twitter,
      email,
      phone,
      mobilePhone,
      address,
      github,
      country,
      postalCode,
      city,
      website,
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
