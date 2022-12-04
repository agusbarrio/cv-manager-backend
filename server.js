'use strict';
const { restConnector } = require('./core');
const { initRestControllers } = require('./modules');
const express = require('express');
const { envConfig } = require('./config');

async function run() {
  const { initExpressApp } = restConnector;
  const app = express();

  initRestControllers();
  initExpressApp(app);

  app.listen(envConfig.PORT, () => {
    console.log(`Server running on ${envConfig.PORT}`);
  });
}

run();
