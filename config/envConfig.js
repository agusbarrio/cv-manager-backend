'use strict';
require('dotenv').config();
const pe = process.env;
module.exports = {
  MYSQL_CONNECTION: pe.MYSQL_CONNECTION,
  LOGGING: pe.LOGGING || false,
  PORT: pe.PORT || 8080,
};
