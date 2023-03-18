'use strict';

const { constants } = require('../../core');

module.exports.MODEL_NAME = 'Project';
module.exports.TABLE_NAME = 'projects';
module.exports.MODEL_ATTRIBUTES = {
  ID: { key: 'id' },
  NAME: { key: 'name' },
  START_DATE: { key: 'startDate' },
  END_DATE: { key: 'endDate' },
  DESCRIPTION: { key: 'description' },
  URL: { key: 'url', max: constants.URL_MAX_LENGTH },
  USER_ID: { key: 'userId' },
  EXPERIENCE_ID: { key: 'experienceId' },
  IMG_SRC: { key: 'imgSrc', max: constants.URL_MAX_LENGTH },
  EDUCATION_ID: { key: 'educationId' },
};
