'use strict';
const { DefaultRestController } = require('../../core');
const service = require('./service');
const validator = require('../utils/validator');
const _ = require('lodash');
const utilsService = require('../utils/service');
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
      skillsIds,
      imgSrc,
    } = req.body;

    const schema = validator.createSchema({
      school: validator.text({ required: { value: true } }),
      degree: validator.text(),
      fieldOfStudy: validator.text(),
      startDate: validator.date(),
      endDate: validator.date(),
      grade: validator.text(),
      activities: validator.description(),
      description: validator.description(),
      skillsIds: validator.ids(),
      imgSrc: validator.url(),
    });

    const newItem = await validator.validate(schema, {
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      activities,
      description,
      skillsIds,
      imgSrc,
    });
    await utilsService.validUserEntities(userId, { skillsIds });
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
      skillsIds,
      imgSrc,
    } = req.body;

    const schema = validator.createSchema({
      id: validator.id(),
      school: validator.text({ required: { value: true } }),
      degree: validator.text(),
      fieldOfStudy: validator.text(),
      startDate: validator.date(),
      endDate: validator.date(),
      grade: validator.text(),
      activities: validator.description(),
      description: validator.description(),
      skillsIds: validator.ids(),
      imgSrc: validator.url(),
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
      skillsIds,
      imgSrc,
    });
    await utilsService.validUserEntities(userId, {
      skillsIds,
      educationsIds: [id],
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
