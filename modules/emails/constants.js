'use strict';

module.exports.EMAIL_TEMPLATES = {
  RECOVER_PASSWORD: {
    key: 'RECOVER_PASSWORD',
    subject: 'Recover password',
    html: `<div
    style="width: 100%; color:white; font-family: sans-serif; text-align: center; padding: 1.5rem; box-sizing: border-box; border-radius: 1rem; background-color: #1976d2;">
    <h1 style="width: 100%; margin: 0;">CV Manager</h1>
    <br>
    <p style="width: 100%; margin: 0; font-size: 1.25rem; margin-bottom: 0.5rem;">Click the button below to set your new
      password.</p>
    <p style="width: 100%; margin: 0; font-size: 1.25rem; margin-bottom: 1rem;">If you did
      not request a password recovery, ignore this email.</p>
    <a href="{{url}}"
      style="background-color: white; padding: 1rem;display: block; width: max-content; margin: auto; border-radius: 1rem; text-decoration: none; color: #1976d2; font-weight: bold; box-shadow: 3px 3px 3px 0px #000000a0;">CHANGE
      PASSWORD</a>
  </div>`,
  },
};
