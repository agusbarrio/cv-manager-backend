'use strict';
require('dotenv').config();
const pe = process.env;
module.exports = {
  //Required
  MYSQL_CONNECTION: pe.MYSQL_CONNECTION,
  SECRET_KEY_ENCRYPTION: pe.SECRET_KEY_ENCRYPTION,
  JWT_SECRET: pe.JWT_SECRET,
  CORS_URL: pe.CORS_URL,
  //Optional
  LOGGING: pe.LOGGING || false,
  PORT: pe.PORT || 8080,
  MYSQL_LOGGING: pe.MYSQL_LOGGING || false,
};
