// import required dependencies
const config = require('../config/config'); // for login
const jwtSecret = config.jwtSecret; // for login
const bcrypt = require('bcrypt'); // for login and signup
const jwt = require('jsonwebtoken'); // for login
const {validationResult} = require('express-validator'); // for login and signup
const uuidv4 = require('uuid/v4'); // for signup
const moment = require('moment'); // for signup

// // OTP
// const authy = require('authy-client');
// // import { Client } from 'authy-client';
// const client = new authy.Client({ key: 'foo' });

// import required files
const balanceModels = require('../models/Balance');

console.log('controller'); // where I am

module.exports = {
  transfer: function(request, response) {
    // get error from validation
    const errors = validationResult(request);

    // is name, password, email valid
    if (!errors.isEmpty()) {
      return response.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid input',
        result: errors.array(),
      });
    }

    // if valid
    const userId = request.params.userId;
    const phoneTo = request.body.phoneTo;
    const nominal = request.body.nominal;

    balanceModels
      .isEnough(userId, nominal)
      .then(function(result) {
        if (result.error) {
          response.status(400).json(result);
        } else {
          balanceModels
            .transfer(userId, nominal, phoneTo)
            .then(function(result) {
              response.status(200).json(result);
            })
            .catch(function(error) {
              console.log(error);
              response.status(500).json({
                status: 500,
                error: true,
                message: 'Internal server error',
                result: {},
              });
            });
        }
      })
      .catch(function(error) {
        console.log(error);
        response.status(500).json({
          status: 500,
          error: true,
          message: 'Internal server error',
          result: {},
        });
      });
  },
};
