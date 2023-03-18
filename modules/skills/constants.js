'use strict';

const { constants } = require('../../core');

module.exports.MODEL_NAME = 'Skill';
module.exports.TABLE_NAME = 'skills';
module.exports.MODEL_ATTRIBUTES = {
  ID: { key: 'id' },
  NAME: { key: 'name' },
  IMG_SRC: { key: 'imgSrc', max: constants.URL_MAX_LENGTH },
  USER_ID: { key: 'userId' },
};
