'use strict';
module.exports = {
  //GENERIC ERRORS

  //Status errors
  E500: { errorCode: 'E500', msg: 'Internal server error.', statusCode: 500 },
  E400: { errorCode: 'E400', msg: 'Bad request', statusCode: 400 },
  E401: { errorCode: 'E401', msg: 'Unauthorized', statusCode: 401 },
  E403: { errorCode: 'E403', msg: 'Forbidden', statusCode: 403 },
  E404: { errorCode: 'E404', msg: 'Not found.', statusCode: 404 },
  E409: { errorCode: 'E409', msg: 'Conflict', statusCode: 409 },
  E422: { errorCode: 'E422', msg: 'Unprocessable Entity', statusCode: 422 },

  //Validation error
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

  //CUSTOM ERRORS

  //401
  INVALID_CREDENTIALS: {
    errorCode: 'E401_001',
    msg: 'Invalid credentials',
    statusCode: 401,
  },
  //409
  EMAIL_NOT_AVAIBLE: {
    errorCode: 'E409_001',
    msg: 'Email not avaible',
    statusCode: 409,
  },
};
