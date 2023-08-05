'use strict';
require('dotenv').config();
const _ = require('lodash');
const pe = process.env;
module.exports = {
  //Required
  MYSQL_CONNECTION: pe.MYSQL_CONNECTION,
  JWT_SECRET: pe.JWT_SECRET,
  FRONTEND_URL: pe.FRONTEND_URL,
  SENDGRID_EMAIL: pe.SENDGRID_EMAIL,
  SENDGRID_APIKEY: pe.SENDGRID_APIKEY,
  //Optional
  LOGGING: _.get(pe, 'LOGGING', 'false') === 'true',
  PORT: _.toInteger(_.get(pe, 'PORT', '8080')),
  MYSQL_LOGGING: _.get(pe, 'MYSQL_LOGGING', 'false') === 'true',
  COOKIE_EXPIRES_IN_SEG: _.toInteger(
    _.get(pe, 'COOKIE_EXPIRES_IN_SEG', 3600)
  ), // 1 hour
  COOKIE_HTTP_ONLY: _.get(pe, 'COOKIE_HTTP_ONLY', 'true') === 'true',
  COOKIE_SAME_SITE: _.get(pe, 'COOKIE_SAME_SITE', 'Strict'),
  COOKIE_SECURE: _.get(pe, 'COOKIE_SECURE', 'true') === 'true',
  COOKIE_DOMAIN: pe.COOKIE_DOMAIN,
};
