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
    email: { value: true },
  },
  STRING: {
    required: { value: true },
  },
};

const string = (_config) => {
  const config = _.merge(DEFAULT_VALIDATIONS.STRING, _config);
  let yupString = Yup.string();
  if (config.required && config.required.value) {
    yupString = yupString.required();
  }
  return yupString;
};

const password = (_config) => {
  const config = _.merge(DEFAULT_VALIDATIONS.PASSWORD, _config);

  const yupPassword = string(config)
    .password()
    .min(config?.min?.value)
    .max(config?.max?.value)
    .minUppercase(config?.minUppercase?.value)
    .minLowercase(config?.minLowercase?.value)
    .minNumbers(config?.minNumbers?.value)
    .minSymbols(config?.minSymbols?.value)
    .minRepeating(config?.minRepeating?.value)
    .minWords(config?.minWords?.value);

  return yupPassword;
};

const email = (_config) => {
  const config = _.merge(DEFAULT_VALIDATIONS.EMAIL, _config);
  const yupEmail = string(config).email();
  return yupEmail;
};

const createSchema = (schema) => {
  return Yup.object(schema);
};
const validate = async (schema, obj) => {
  const result = await schema.validate(obj).catch((err) => {
    throw ERRORS.VALIDATION_ERROR(err);
  });
  return result;
};
module.exports = { email, password, string, validate, createSchema };
