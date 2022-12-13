'use strict';
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const ERRORS = require('./errors');
const { envConfig } = require('../config');
const authUtils = require('../modules/auth/utils');
const routes = { post: [], put: [], get: [], delete: [] };

/**
 * @param {String} method get, put, post, delete, etc
 * @param {String} path Ej: "/users"
 * @param {(Function|Array.<Function>)} handlers Array of functions (req, res, next) => {...} or function
 * @returns
 */
function createEndpoint(
  method,
  path,
  handlers = [],
  options = { needToken: false }
) {
  let middlewares = [];
  const context = {};
  if (typeof handlers === 'function') middlewares.push(handlers);

  if (options.needToken) {
    middlewares.unshift(async (req, res, next) => {
      const token = req.cookies.token;
      const decodedToken = authUtils.validToken(token);
      context.user = { id: decodedToken.id };
      next();
    });
  }

  middlewares = middlewares.map((middleware) => async (req, res, next) => {
    res.ok = () => res.json({ statusCode: 200, msg: 'Ok' });
    try {
      await middleware(req, res, next, context);
    } catch (err) {
      next(err);
    }
  });

  return routes[method.toLowerCase()].push({ path, middlewares });
}

function initExpressApp(app) {
  //middlewares
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  if (envConfig.LOGGING) app.use(morgan('combined'));

  //routes
  Object.keys(routes).forEach((method) =>
    routes[method].forEach((route) =>
      app[method]('/api' + route.path, ...route.middlewares)
    )
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
