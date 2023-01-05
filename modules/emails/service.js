'use strict';

const sgMail = require('@sendgrid/mail');
const { envConfig } = require('../../config');
const { EMAIL_TEMPLATES } = require('./constants');
const _ = require('lodash');
const { ERRORS } = require('../../core');
const mustache = require('mustache');
if (envConfig.SENDGRID_APIKEY) sgMail.setApiKey(envConfig.SENDGRID_APIKEY);

const sendMail = async (template, to, cc = '', bcc = '') => {
  const msg = {
    to,
    cc,
    bcc,
    from: `CV Manager - <${envConfig.SENDGRID_EMAIL}>`,
    subject: 'CV Manager',
    html: 'ups',
    ...template,
  };
  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    return false;
  }
};

const getTemplate = (templateKey, params) => {
  const template = _.find(EMAIL_TEMPLATES, { key: templateKey });
  if (!template) throw ERRORS.E500;
  return {
    html: mustache.render(template.html, params),
    subject: mustache.render(template.subject, params),
    from: envConfig.SENDGRID_EMAIL,
  };
};

const getResetPasswordUrl = (token) =>
  `${envConfig.FRONTEND_URL}/auth/resetPassword?token=${token}`;

module.exports = { sendMail, getTemplate, getResetPasswordUrl };
