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
    const experiences = await service.getAllByUser(userId);
    res.json(experiences);
  };

  createOne = async (req, res, next, context) => {
    const userId = context.user.id;
    const {
      name,
      startDate,
      endDate,
      description,
      url,
      skillsIds,
      experienceId,
      educationId,
      imgSrc,
    } = req.body;

    const schema = validator.createSchema({
      name: validator.name(),
      startDate: validator.date({ required: { value: true } }),
      endDate: validator.date(),
      description: validator.description({ required: { value: true } }),
      url: validator.url(),
      skillsIds: validator.ids(),
      experienceId: validator.id({ required: { value: false } }),
      educationId: validator.id({ required: { value: false } }),
      imgSrc: validator.url(),
    });

    const data = await validator.validate(schema, {
      name,
      startDate,
      endDate,
      description,
      url,
      skillsIds,
      experienceId,
      educationId,
      imgSrc,
    });
    await utilsService.validUserEntities(userId, {
      skillsIds,
      experiencesIds: !!experienceId && [experienceId],
      educationsIds: !!educationId && [educationId],
    });
    await service.createOneByUser(userId, data);
    res.ok();
  };

  editOne = async (req, res, next, context) => {
    const userId = context.user.id;
    const { id } = req.params;
    const {
      name,
      startDate,
      endDate,
      description,
      url,
      skillsIds,
      experienceId,
      educationId,
      imgSrc,
    } = req.body;

    const schema = validator.createSchema({
      id: validator.id(),
      name: validator.name(),
      startDate: validator.date({ required: { value: true } }),
      endDate: validator.date(),
      description: validator.description({ required: { value: true } }),
      url: validator.url(),
      skillsIds: validator.ids(),
      experienceId: validator.id({ required: { value: false } }),
      educationId: validator.id({ required: { value: false } }),
      imgSrc: validator.url(),
    });

    const data = await validator.validate(schema, {
      id,
      name,
      startDate,
      endDate,
      description,
      url,
      skillsIds,
      experienceId,
      educationId,
      imgSrc,
    });
    await utilsService.validUserEntities(userId, {
      skillsIds,
      projectsIds: [id],
      experiencesIds: !!experienceId && [experienceId],
      educationsIds: !!educationId && [educationId],
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
