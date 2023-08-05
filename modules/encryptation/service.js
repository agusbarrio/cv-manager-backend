'use strict ';
//const crypto = require('crypto');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { envConfig } = require('../../config');

const ERRORS = require('../constants/errors');
const { TOKEN_DURATION, TOKEN_TYPES } = require('./constants');


const encryptationServices = {
    convertTextToHash: async (data) => {
        const hash = await bcrypt.hash(data, 10);
        return hash;
    },
    compareTextWithHash: async (plainText, hash) => {
        const result = await bcrypt.compare(plainText, hash);
        return result;
    },
    createToken: (data, type, options = {}) => {
        const defaultOptions = { expiresIn: TOKEN_DURATION };
        const tokenOptions = _.merge(defaultOptions, options);
        return jwt.sign({ data, type }, envConfig.JWT_SECRET, tokenOptions);
    },
    createLoginToken: (userId) =>
        createToken({ id: userId }, TOKEN_TYPES.LOGIN),

    createRecoverPasswordToken: (userId) =>
        createToken({ id: userId }, TOKEN_TYPES.RECOVER_PASSWORD),

    validToken: function (token) {
        if (!token) throw ERRORS.E401;
        let decodedToken;
        jwt.verify(token, envConfig.JWT_SECRET, function (err, decoded) {
            if (err) throw ERRORS.E401;
            decodedToken = decoded;
        });
        return decodedToken;
    }
};

module.exports = encryptationServices;
