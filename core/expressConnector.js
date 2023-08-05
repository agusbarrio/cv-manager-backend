'use strict';
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ERRORS = require('./errors');
const { envConfig } = require('../config');
const encryptationServices = require('../modules/encryptation/service');
const routes = { post: [], put: [], get: [], delete: [] };
const _ = require('lodash');
const { TOKEN_COOKIE_NAME } = require('../modules/encryptation/constants');

/**
 * @param {String} method get, put, post, delete, etc
 * @param {String} path Ej: "/users"
 * @param {(Function|Array.<Function>)} handlers Array of functions (req, res, next) => {...} or function
 * @returns
 */
function createEndpoint(method, path, handlers = [], options = {}) {
  const defaultOptions = {
    needToken: false,
    needApikey: false,
    corsEnabled: true,
    corsOptions: {
      origin: envConfig.FRONTEND_URL,
      credentials: true,
    },
  };
  const resultOptions = _.merge(defaultOptions, options);

  let middlewares = [];
  const context = {};
  if (_.isFunction(handlers)) middlewares.push(handlers);
  if (_.isArray(handlers)) middlewares.push(...handlers);

  if (resultOptions.needToken) {
    middlewares.unshift(async (req, res, next) => {
      try {
        const token = req.cookies.token;
        const decodedToken = encryptationServices.validToken(token);
        context.user = { id: decodedToken.data.id };
        next();
      } catch (err) {
        res.clearCookie(TOKEN_COOKIE_NAME);
        throw ERRORS.E401;
      }
    });
  }

  if (resultOptions.needApikey) {
    middlewares.unshift(async (req, res, next) => {
      const apikey = req.headers['authorization'];
      if (!apikey) throw ERRORS.E401;
      context.apikey = { id: apikey };
      next();
    });
  }

  middlewares = middlewares.map((middleware) => async (req, res, next) => {
    res.ok = () => res.json({ statusCode: 200, msg: 'Ok' });
    res.setCookie = (key, value, options = {}) => {
      return res.cookie(key, value, {
        expiresIn: envConfig.COOKIE_EXPIRES_IN_SEG,
        httpOnly: envConfig.COOKIE_HTTP_ONLY,
        sameSite: envConfig.COOKIE_SAME_SITE,
        secure: envConfig.COOKIE_SECURE,
        domain: envConfig.COOKIE_DOMAIN,
        ...options,
      });
    };
    res.clearCookie = (key, options) => res.setCookie(key, '', options);
    try {
      await middleware(req, res, next, context);
    } catch (err) {
      next(err);
    }
  });

  if (resultOptions.corsEnabled) {
    middlewares.unshift(cors(resultOptions.corsOptions));
  }

  return routes[method.toLowerCase()].push({
    path,
    middlewares,
    corsEnabled: resultOptions.corsEnabled,
    corsOptions: resultOptions.corsOptions,
  });
}

function initExpressApp(app) {
  //middlewares
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  if (envConfig.LOGGING) app.use(morgan('combined'));

  //routes
  Object.keys(routes).forEach((method) =>
    routes[method].forEach((route) => {
      const path = '/api' + route.path;
      if (route.corsEnabled) app.options(path, cors(route.corsOptions));
      app[method](path, ...route.middlewares);
    })
  );

  // Error handler
  app.use((req, res, next) => {
    next(ERRORS.E404);
  });

  // Error response & logger
  app.use((error, req, res, next) => {
    console.log(error.stack);
    const resError = {
      msg: error.msg || ERRORS.E500.msg,
      errorCode: error.errorCode || ERRORS.E500.errorCode,
      statusCode: error.statusCode || ERRORS.E500.statusCode,
      info: error.info,
    };
    if (error.statusCode === ERRORS.E400.statusCode) {
      resError.msg = ERRORS.E400.msg;
      resError.errorCode = ERRORS.E400.errorCode;
    }
    res.status(resError.statusCode).json(resError);
  });

  return app;
}

module.exports = { initExpressApp, createEndpoint };
