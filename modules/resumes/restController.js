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
      title,
      contactId,
      introId,
      experiencesIds,
      skillsIds,
      projectsIds,
      educationsIds,
    } = req.body;

    const schema = validator.createSchema({
      title: validator.text({ required: { value: true } }),
      contactId: validator.id(),
      introId: validator.id(),
      experiencesIds: validator.ids(),
      skillsIds: validator.ids(),
      projectsIds: validator.ids(),
      educationsIds: validator.ids(),
    });

    const data = await validator.validate(schema, {
      title,
      contactId,
      introId,
      experiencesIds,
      skillsIds,
      projectsIds,
      educationsIds,
    });

    await utilsService.validUserEntities(userId, {
      ...data,
      contactsIds: [data.contactId],
      introsIds: [data.introId],
    });
    await service.createOneByUser(userId, data);
    res.ok();
  };

  editOne = async (req, res, next, context) => {
    const userId = context.user.id;
    const { id } = req.params;
    const {
      title,
      contactId,
      introId,
      experiencesIds,
      skillsIds,
      projectsIds,
      educationsIds,
    } = req.body;

    const schema = validator.createSchema({
      id: validator.id(),
      title: validator.text({ required: { value: true } }),
      contactId: validator.id(),
      introId: validator.id(),
      experiencesIds: validator.ids(),
      skillsIds: validator.ids(),
      projectsIds: validator.ids(),
      educationsIds: validator.ids(),
    });

    const data = await validator.validate(schema, {
      id,
      title,
      contactId,
      introId,
      experiencesIds,
      skillsIds,
      projectsIds,
      educationsIds,
    });
    await utilsService.validUserEntities(userId, {
      ...data,
      contactsIds: [data.contactId],
      introsIds: [data.introId],
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
