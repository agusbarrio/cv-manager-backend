'use strict';

const _ = require('lodash');
const Yup = require('yup');
const YupPassword = require('yup-password');
const { ERRORS } = require('../../core');

YupPassword(Yup);

/**
 * Hook para devolver diferentes schemas de validacion
 * @returns
 */

const DEFAULT_VALIDATIONS = {
  PASSWORD: {
    required: { value: true },
    min: { value: 4 },
    max: { value: 16 },
    minUppercase: { value: 1 },
    minLowercase: { value: 1 },
    minNumbers: { value: 1 },
    minSymbols: { value: 1 },
    minRepeating: { value: 3 },
    minWords: { value: 1 },
  },
  EMAIL: {
    required: { value: true },
  },
  TITLE: {
    required: { value: true },
    max: { value: 140 },
  },
  DESCRIPTION: {
    required: { value: false },
    max: { value: 255 },
  },
  ID: {
    required: { value: true },
    moreThan: { value: 0 },
  },
  NAME: {
    required: { value: true },
    max: { value: 60 },
  },
};

const string = (config = {}) => {
  let yupString = Yup.string();
  if (config.required && config.required.value) {
    yupString = yupString.required();
  } else {
    yupString = yupString.nullable();
  }
  if (config.min && config.min.value) {
    yupString = yupString.min(config.min.value);
  }
  if (config.max && config.max.value) {
    yupString = yupString.max(config.max.value);
  }
  return yupString;
};

const date = (config = {}) => {
  let yupDate = Yup.date();
  if (config.required && config.required.value) {
    yupDate = yupDate.required();
  } else {
    yupDate = yupDate.nullable();
  }
  if (config.min && config.min.value) {
    yupDate = yupDate.min(config.min.value);
  }
  if (config.max && config.max.value) {
    yupDate = yupDate.min(config.max.value);
  }
  return yupDate;
};

const number = (config = {}) => {
  let yupNumber = Yup.number();
  if (config.required && config.required.value) {
    yupNumber = yupNumber.required();
  } else {
    yupNumber = yupNumber.nullable();
  }
  if (config.min && config.min.value) {
    yupNumber = yupNumber.min(config.min.value);
  }
  if (config.max && config.max.value) {
    yupNumber = yupNumber.min(config.max.value);
  }
  if (config.moreThan && config.moreThan.value) {
    yupNumber = yupNumber.moreThan(config.moreThan.value);
  }
  if (config.lessThan && config.lessThan.value) {
    yupNumber = yupNumber.lessThan(config.lessThan.value);
  }
  return yupNumber;
};

const password = (_config = {}) => {
  const config = _.merge(_.cloneDeep(DEFAULT_VALIDATIONS.PASSWORD), _config);

  let yupPassword = string(config).password();

  if (config.minUppercase && config.minUppercase.value) {
    yupPassword = yupPassword.minUppercase(config.minUppercase.value);
  }
  if (config.minLowercase && config.minLowercase.value) {
    yupPassword = yupPassword.minLowercase(config.minLowercase.value);
  }
  if (config.minNumbers && config.minNumbers.value) {
    yupPassword = yupPassword.minNumbers(config.minNumbers.value);
  }
  if (config.minSymbols && config.minSymbols.value) {
    yupPassword = yupPassword.minSymbols(config.minSymbols.value);
  }
  if (config.minRepeating && config.minRepeating.value) {
    yupPassword = yupPassword.minRepeating(config.minRepeating.value);
  }
  if (config.minWords && config.minWords.value) {
    yupPassword = yupPassword.minWords(config.minWords.value);
  }

  return yupPassword;
};

const email = (_config = {}) => {
  const config = _.merge(_.cloneDeep(DEFAULT_VALIDATIONS.EMAIL), _config);
  const yupEmail = string(config).email();
  return yupEmail;
};

const title = (_config = {}) => {
  const config = _.merge(_.cloneDeep(DEFAULT_VALIDATIONS.TITLE), _config);
  const yupTitle = string(config);
  return yupTitle;
};

const description = (_config = {}) => {
  const config = _.merge(_.cloneDeep(DEFAULT_VALIDATIONS.DESCRIPTION), _config);
  const yupDescription = string(config);
  return yupDescription;
};

const oneOf = (values, config = {}) => {
  const yupOneOf = string(config).oneOf(values);
  return yupOneOf;
};

const id = (_config = {}) => {
  const config = _.merge(_.cloneDeep(DEFAULT_VALIDATIONS.ID), _config);
  const yupId = number(config);
  return yupId;
};

const name = (_config = {}) => {
  const config = _.merge(_.cloneDeep(DEFAULT_VALIDATIONS.NAME), _config);
  const yupName = string(config);
  return yupName;
};

const createSchema = (schema) => {
  return Yup.object().shape(schema);
};
const validate = async (schema, obj) => {
  const result = await schema.validate(obj).catch((err) => {
    throw ERRORS.VALIDATION_ERROR(err);
  });
  return result;
};
module.exports = {
  email,
  password,
  string,
  validate,
  createSchema,
  title,
  description,
  oneOf,
  date,
  number,
  id,
  name,
};
