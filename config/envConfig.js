'use strict';
require('dotenv').config();
const pe = process.env;
module.exports = {
  //Required
  MYSQL_CONNECTION: pe.MYSQL_CONNECTION,
  SECRET_KEY_ENCRYPTION: pe.SECRET_KEY_ENCRYPTION,
  JWT_SECRET: pe.JWT_SECRET,
  FRONTEND_URL: pe.FRONTEND_URL,
  SENDGRID_EMAIL: pe.SENDGRID_EMAIL,
  SENDGRID_APIKEY: pe.SENDGRID_APIKEY,
  //Optional
  LOGGING: pe.LOGGING || false,
  PORT: pe.PORT || 8080,
  MYSQL_LOGGING: pe.MYSQL_LOGGING || false,
};
