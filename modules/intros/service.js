'use strict';
const { ERRORS } = require('../../core');
const _ = require('lodash');
const { MODEL_ATTRIBUTES } = require('./constants');
const dbService = require('./dbService');

const RETURNING_ATTRIBUTES = _.values(MODEL_ATTRIBUTES).filter(
  (attr) => attr !== MODEL_ATTRIBUTES.USER_ID
);

const getAllByUser = async (userId) => {
  const result = await dbService.getAllByUser(userId, RETURNING_ATTRIBUTES);
  return result;
};
const createOneByUser = async (userId, newItem) => {
  const created = await dbService.createOneByUser(userId, newItem);
  return created;
};
const editOneByUser = async (id, userId, dataToUpdate) => {
  const result = await dbService.editOneByUser(id, userId, dataToUpdate);
  return result;
};
const deleteOneByUser = async (id, userId) => {
  const count = await dbService.deleteOneByUser(id, userId);
  if (count === 0) throw ERRORS.E404;
  return count;
};
const deleteAllByUser = async (userId) => {
  const count = await dbService.deleteAllByUser(userId);
  return count;
};

module.exports = {
  getAllByUser,
  createOneByUser,
  editOneByUser,
  deleteOneByUser,
  deleteAllByUser,
};
