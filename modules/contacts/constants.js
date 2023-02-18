'use strict';

const { constants } = require('../../core');

module.exports.MODEL_NAME = 'Contact';
module.exports.TABLE_NAME = 'contacts';
module.exports.MODEL_ATTRIBUTES = {
  ID: { key: 'id' },
  TITLE: { key: 'title' },
  LINKEDIN: { key: 'linkedin', max: constants.URL_MAX_LENGTH },
  FACEBOOK: { key: 'facebook', max: constants.URL_MAX_LENGTH },
  TWITTER: { key: 'twitter', max: constants.URL_MAX_LENGTH },
  EMAIL: { key: 'email' },
  PHONE: { key: 'phone' },
  MOBILE_PHONE: { key: 'mobilePhone' },
  ADDRESS: { key: 'address' },
  GITHUB: { key: 'github', max: constants.URL_MAX_LENGTH },
  COUNTRY: { key: 'country' },
  POSTAL_CODE: { key: 'postalCode' },
  CITY: { key: 'city' },
  WEBSITE: { key: 'website', max: constants.URL_MAX_LENGTH },
  USER_ID: { key: 'userId' },
};
