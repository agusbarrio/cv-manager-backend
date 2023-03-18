'use strict';

const { constants } = require('../../core');

module.exports.MODEL_NAME = 'Intro';
module.exports.TABLE_NAME = 'intros';
module.exports.MODEL_ATTRIBUTES = {
  ID: { key: 'id' },
  FIRST_NAME: { key: 'firstName' },
  LAST_NAME: { key: 'lastName' },
  HEAD_LINE: { key: 'headLine' },
  BIRTHDAY: { key: 'birthday' },
  ABOUT: { key: 'about' },
  IMG_SRC: { key: 'imgSrc', max: constants.URL_MAX_LENGTH },
  USER_ID: { key: 'userId' },
};
