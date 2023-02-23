'use strict';
const { DefaultRestController } = require('../../core');
const resumesService = require('../resumes/service');

class RestController extends DefaultRestController {
  constructor(moduleName) {
    super(moduleName);
    this.createEndpoint('get', '/', this.getResumeByApikey, {
      needApikey: true,
      corsOptions: {
        origin: '*',
      },
    });
  }

  getResumeByApikey = async (req, res, next, context) => {
    const apikeyId = context.apikey.id;
    const resume = await resumesService.getByApikey(apikeyId);
    res.json(resume);
  };
}

module.exports = RestController;
