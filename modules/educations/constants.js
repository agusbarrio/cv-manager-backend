'use strict';

const { constants } = require('../../core');

module.exports.MODEL_NAME = 'Education';
module.exports.TABLE_NAME = 'educations';
module.exports.MODEL_ATTRIBUTES = {
  ID: { key: 'id' },
  SCHOOL: { key: 'school' },
  DEGREE: { key: 'degree' },
  FIELD_OF_STUDY: { key: 'fieldOfStudy' },
  START_DATE: { key: 'startDate' },
  END_DATE: { key: 'endDate' },
  GRADE: { key: 'grade' },
  ACTIVITIES: { key: 'activities' },
  DESCRIPTION: { key: 'description' },
  USER_ID: { key: 'userId' },
};
