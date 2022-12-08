'use strict';
require('dotenv').config();
const pe = process.env;
module.exports = {
  //Required
  MYSQL_CONNECTION: pe.MYSQL_CONNECTION,
  SECRET_KEY_ENCRYPTION: pe.SECRET_KEY_ENCRYPTION,
  //Optional
  LOGGING: pe.LOGGING || false,
  PORT: pe.PORT || 8080,
  MYSQL_LOGGING: pe.MYSQL_LOGGING || false,
};
