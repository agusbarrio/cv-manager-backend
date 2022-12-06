'use strict';
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const ERRORS = require('./errors');
const { envConfig } = require('../config');

const routes = { post: [], put: [], get: [], delete: [] };

/**
 * @param {String} method get, put, post, delete, etc
 * @param {String} path Ej: "/users"
 * @param {(Function|Array.<Function>)} middlewares Array of functions (req, res, next) => {...} or function
 * @returns
 */
function createEndpoint(method, path, middlewares = []) {
  if (typeof middlewares === 'function') middlewares = [middlewares];
  middlewares = middlewares.map((middleware) => async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  });
  return routes[method.toLowerCase()].push({ path, middlewares });
}

/**
 * @param {Object} res res from (req, res, next) params
 * @param {Object} data data to send
 * @returns
 */
function sendJSON(res, data = {}) {
  return res.json(data);
}

/**
 * @param {Object} res res from (req, res, next) params
 * @param {Object} msg message to send
 * @returns
 */
function sendMessage(res, msg = '') {
  return res.send(msg);
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
    res
      .status(error.statusCode || ERRORS.E500.statusCode)
      .send(error.msg ? error : ERRORS.E500);
  });

  return app;
}

module.exports = { initExpressApp, createEndpoint, sendJSON, sendMessage };
