// import required dependencies
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4'); // for transfer id
const moment = require('moment'); // for transfer date

// import required files
const connection = require('../config/db');
console.log('model'); // where I am

module.exports = {

  isEnough: function(userId, nominal) {
    return new Promise( function(resolve, reject) {
      const queryCash = `SELECT opo_cash FROM balances WHERE user_id = '${userId}'`
      connection.query(queryCash, function(error, result) {
        if (!error) {
          if (result.length === 0) {
            resolve({
              status: 400,
              error: true,
              message: 'User that want to transfer was not found',
              result: {},
            });
          } else {
            if (result[0].opo_cash < nominal) {
              resolve({
                status: 400,
                error: true,
                message: 'Your opo cash was not enough',
                result: {},
              })
            } else {
              resolve(result)
            }
          }
        } else {
          reject(error);
        }
      });
    });
  },

  transfer: function(userId, nominal, phoneTo) {
    return new Promise( function(resolve, reject) {
      const queryPhone = `SELECT * FROM users WHERE phone = '${phoneTo}'`
      connection.query(queryPhone, function(error, result) {
        if (!error) {
          if (result.length === 0) {
            resolve({
              status: 400,
              error: true,
              message: 'User that want to be transfered was not found',
              result: {},
            });
          } else {
            const userIdTo = result[0].id
            const queryFrom = `UPDATE balances SET opo_cash = opo_cash - ${nominal} WHERE user_id = "${userId}"`
            connection.query(queryFrom, function(error, result) {
              if (!error) {
                const queryTo = `UPDATE balances SET opo_cash = opo_cash + ${nominal} WHERE user_id = "${userIdTo}"`
                connection.query(queryTo, function(error, result) {
                  if (!error) {
                    const dataTransfer = {
                      'id': uuidv4(),
                      'user_id_from': userId,
                      'user_id_to': userIdTo,
                      'nominal': parseInt(nominal),
                      'date': moment().format().split('+')[0],
                    }
                    const queryTransfer = `INSERT INTO transfers SET ?`
                    connection.query(queryTransfer, dataTransfer, function(error, result) {
                      if (!error) {
                        resolve({
                          'status': 200,
                          'error': false,
                          'message': 'Transfer to ' + phoneTo + ' was done successfully',
                          'result': dataTransfer,
                        })
                      } else {
                        reject(error);
                      }
                    })
                  } else {
                    reject(error);    
                  }
                })
              } else {
                reject(error);
              }
            });
          }
        } else {
          reject(error);
        }
      });
    });
  },

};
