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
const userModels = require('../models/user');

console.log('controller'); // where I am

module.exports = {

  login1: function(request, response) {

    // is login data valid
    const errors = validationResult(request);    
    if (!errors.isEmpty()) {
      return response.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid input',
        result: errors.array(),
      });
    }

    const phone = request.body.phone;
    // const securityCode = request.body.securityCode;

    const data_login = {
      phone,
    };

    userModels.login1(data_login)
    .then( function(result) {
      if (result.error) {
        response.status(400).json(result);
      }
      let otp = ''
      for (i=1; i<5; i++){
        var a = Math.floor(Math.random()*10)
        // console.log(a.toString())
        otp = otp + a
      }
      response.status(201).json({
        status: 201,
        error: false,
        message: 'Your login step 1 was successful', //'Login as ' + result.name,
        result: {
          ...data_login,
          otp,
        }
      });
    })
    .catch( function(error) {
      console.log(error);
      response.status(500).json({
        status: 500,
        error: true,
        message: 'Internal server error',
        result: {},
      });
    })
  },

  login2: function(request, response) {

    // is login data valid
    const errors = validationResult(request);    
    if (!errors.isEmpty()) {
      return response.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid input',
        result: errors.array(),
      });
    }

    const phone = request.body.phone;
    const securityCode = request.body.securityCode;

    const data_login = {
      'phone': phone,
      'securityCode': securityCode,
    };

    userModels.login2(data_login)
    .then( function(result) {

      compareSecurityCode = bcrypt.compareSync(data_login.securityCode, result.security_code);
      if (!compareSecurityCode) {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Security Code salah. Mohon untuk mencoba kembali',
          result: {},
        });
      }

      // generate token for logged in user
      const token = 'hello00opo ' + jwt.sign({data_login}, jwtSecret) //, {expiresIn: 3600}); // per unit second

      response.status(201).json({
        status: 201,
        error: false,
        message: 'Login as ' + result.name,
        result: {
          ...result,
          id: '',
          security_code: '',
          authorization: token,
        },
      });
    })
    .catch( function(error) {
      console.log(error);
      response.status(500).json({
        status: 500,
        error: true,
        message: 'Internal server error',
        result: {},
      });
    });
  },

  signup1: function(request, response) {
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
    const name = request.body.name;
    const phone = request.body.phone;
    const email = request.body.email;
    // const securityCode = request.body.securityCode
    const data_signup = {
      name,
      phone,
      email,
    }

    userModels.signup1(data_signup)
    .then( function(result) {
      let otp = ''
      for (i=1; i<5; i++){
        var a = Math.floor(Math.random()*10)
        // console.log(a.toString())
        otp = otp + a
      }
      if (result.result.phoneAlready){
        // go login
        response.status(201).json({
          status: 201,
          error: false,
          message: result.message, //'Login as ' + result.name,
          result: {
            ...data_signup,
            otp,
            'phoneAlready': result.result.phoneAlready,
          }
        });
      } else {
        // continue signup
        response.status(201).json({
          status: 201,
          error: false,
          message: 'Your registration step 1 was successful',
          result: {
            ...data_signup,
            otp,
            'phoneAlready': result.result.phoneAlready,
          }
        });
      }
    })
    .catch( function(error) {
      console.log(error);
      response.status(500).json({
        status: 500,
        error: true,
        message: 'Internal server error',
        result: {},
      });
    })

    // client.registerUser({
    //   countryCode: 'ID',
    //   email,
    //   phone
    // }).then(function(response) {
    //   return response.user.id;
    // }).then(function(authyId) {
    //   return client.requestSms({ authyId: authyId });
    // }).then(function(response) {
    //   console.log(`SMS requested to ${response.cellphone}`);
    // });
  },

  signup2: function(request, response) {
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
    const name = request.body.name;
    const phone = request.body.phone;
    const email = request.body.email;
    const securityCode = request.body.securityCode

    bcrypt.genSalt(10, function(error, salt) {
      if (error) {
        console.log(error);
        response.status(500).json({
          status: 500,
          error: true,
          message: 'Internal server error',
          result: {},
        });
      }
      bcrypt.hash(securityCode, salt, function(errorHash, hash) {
        if (errorHash) {
          console.log(errorHash);
          response.status(500).json({
            status: 500,
            error: true,
            message: 'Internal server error',
            result: {},
          });
        }

        const id = uuidv4();
        const data_signup = {
          id,
          name,
          phone,
          email,
          'security_code': hash,
          'created_at': moment().format().split('+')[0],
        };

        userModels.signup2(data_signup)
        .then( function(result) {
          const data_login = {
            'phone': data_signup.phone,
            'securityCode': securityCode,
          };
          const token = 'hello00opo ' + jwt.sign({data_login}, jwtSecret) //, {expiresIn: 3600}); // per unit second
          response.status(201).json({
            status: 201,
            error: false,
            message: 'Your registration step 2 was successful, done. Direcetly login as ' + data_signup.name,
            result: {
              ...data_signup,
              'security_code': '',
              'photo': null,
              'opo_cash': 0,
              'opo_point': 0,
              'user_id': data_signup.id,
              id: '',
              authorization: token,
            },
          });
        })
        .catch( function(error) {
          console.log(error);
          response.status(500).json({
            status: 500,
            error: true,
            message: 'Internal server error',
            result: {},
          });
        });
      });
    });
  },

};
