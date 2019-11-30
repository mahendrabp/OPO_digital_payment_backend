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
const ppobinModels = require('../models/PpobIn');
const ppoboutModels = require('../models/PpobOut');

console.log('controller'); // where I am

module.exports = {

  history: function(request, response) {
    const { userId } = request.params
    balanceModels.history(userId)
    .then(result=>{
      const newResult = []
      for (transaction in result) {
        // console.log(transaction)
        result[transaction].forEach(transactionDetail=>{
          newResult.push({...transactionDetail, histType:transaction})
        })
      }
      // sort by date
      newResult.sort(function(a, b){
        var keyA = new Date(a.date),
        keyB = new Date(b.date);
        // Compare the 2 dates
        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0;
      });
      response.status(200).json({
        status: 200,
        error: false,
        message: 'Success get history from user with id: ' + userId,
        // result,
        newResult,
      })
    })
    .catch(error=>{
      response.status(404).json(error)
    })
  },

  ppob: function(request, response) {
    // get error from validation
    const errors = validationResult(request);

    // is valid
    if (!errors.isEmpty()) {
      return response.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid input',
        result: errors.array(),
      });
    }

    const { type, userId } = request.params
    const { opoType, merchantId, nominal, transactionType } = request.body
    let cost = request.body.cost;
    const id = uuidv4();
    const date = moment().format().split('+')[0];

    if (opoType !== 'opo_cash' && opoType !== 'opo_point') {
      return response.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid opo type',
        result: {
          opoType,
          date,
        },
      });
    }

    if (cost === undefined || cost === '') {
      cost = 0
    }

    let nominalSign = ''
    if (type === 'in') {
      console.log('in')
      nominalSign = ( parseInt(nominal) + parseInt(cost) )
      console.log(nominalSign)
    } else if (type === 'out') {
      console.log('out')
      nominalSign = -( parseInt(nominal) + parseInt(cost) )
      console.log(nominalSign)
    } else {
      return response.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid type',
        result: {
          type,
          date,
        },
      });
    }

    balanceModels.ppob(userId, opoType, nominalSign)
    .then(result=>{

      if (result.error) {
        result.result['merchantId'] = merchantId
        result.result['saldoWillOut'] = parseInt(nominal) + parseInt(cost)
        result.result['date'] = date
        response.status(400).json(result)
      } else {

        if (type === 'in') {

          // data
          const data = {
            id,
            merchant_id: merchantId,
            user_id: userId,
            total: nominal,
            opo_type: opoType,
            date,
          };

          ppobinModels
            .create(data)
            .then(resultPpob => {
              result.result['merchantId'] = merchantId
              result.result['saldoIn'] = parseInt(nominal)
              result.result['date'] = date
              response.status(201).json(result);
            })
            .catch(errorPpob => {
              response.status(400).json({
                status: 400,
                error: true,
                message: 'Failed create a ppob in',
                data: error,
              });
            });
    
        } else { // if out

          // if (cost === undefined) {
          //   cost = 0
          // }

          // data
          const data = {
            id,
            merchant_id: merchantId,
            user_id: userId,
            nominal,
            cost,
            total: parseInt(nominal) + parseInt(cost),
            opo_type: opoType,
            date,
            transaction_type: transactionType,
          };

          ppoboutModels
            .create(data)
            .then(resultPpob => {
              result.result['merchantId'] = merchantId
              result.result['saldoOut'] = data.total //parseInt(nominal)
              result.result['transactionType'] = transactionType
              result.result['date'] = date
              response.status(201).json(result);
            })
            .catch(errorPpob => {
              response.status(400).json({
                status: 400,
                error: true,
                message: 'Failed create a ppob out',
                data: errorPpob,
              });
            });

        }

      }
  
    })
    .catch(error=>{
      console.log(error);
      response.status(500).json({
        status: 500,
        error: true,
        message: 'Internal server error',
        result: {},
      });
    })
  },

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
