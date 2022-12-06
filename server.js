'use strict';
const { restConnector, dbConnector } = require('./core');
const { initRestControllers, initDbModels } = require('./modules');
const express = require('express');
const { envConfig } = require('./config');

async function run() {
  //Db connection
  const { connectDb } = dbConnector;
  await connectDb();
  await initDbModels();

  //Express app
  const { initExpressApp } = restConnector;
  const app = express();
  await initRestControllers();
  await initExpressApp(app);

  //Run server
  app.listen(envConfig.PORT, () => {
    console.log(`Server running on ${envConfig.PORT}`);
  });
}

run();
