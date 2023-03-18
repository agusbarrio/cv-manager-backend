'use strict';

const { constants } = require('../../core');

module.exports.MODEL_NAME = 'Experience';
module.exports.TABLE_NAME = 'experiences';
module.exports.MODEL_ATTRIBUTES = {
  ID: { key: 'id' },
  TITLE: { key: 'title' },
  COMPANY_NAME: { key: 'companyName' },
  LOCATION: { key: 'location' },
  START_DATE: { key: 'startDate' },
  END_DATE: { key: 'endDate' },
  INDUSTRY: { key: 'industry' },
  DESCRIPTION: { key: 'description' },
  EMPLOYMENT_TYPE: { key: 'employmentType' },
  IMG_SRC: { key: 'imgSrc', max: constants.URL_MAX_LENGTH },
  USER_ID: { key: 'userId' },
};

module.exports.EMPLOYMENT_TYPES = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  SELF_EMPLOYED: 'SELF_EMPLOYED',
  FREELANCE: 'FREELANCE',
  CONTRACT: 'CONTRACT',
  INTERNSHIP: 'INTERNSHIP',
  APPRENTICENSHIP: 'APPRENTICENSHIP',
  SEASONAL: 'SEASONAL',
};
