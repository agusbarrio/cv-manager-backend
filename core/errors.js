'use strict';
module.exports = {
  E500: { errorCode: 'E500', msg: 'Internal server error.', statusCode: 500 },
  E400: { errorCode: 'E400', msg: 'Bad request', statusCode: 400 },
  E404: { errorCode: 'E404', msg: 'Not found.', statusCode: 404 },
  E409: { errorCode: 'E409', msg: 'Conflict', statusCode: 409 },
  E422: { errorCode: 'E422', msg: 'Unprocessable Entity', statusCode: 422 },
  VALIDATION_ERROR: function (error) {
    return {
      ...this.E422,
      info: {
        reason: error.message,
        field: error.path,
      },
      stack: error.stack,
    };
  },
  CONFLICT_ERROR: function (field, msg) {
    return {
      ...this.E409,
      info: {
        reason: msg,
        field: field,
      },
    };
  },
};
