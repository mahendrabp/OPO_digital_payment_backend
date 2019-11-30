// import required dependencies
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4'); // for transfer id
const moment = require('moment'); // for transfer date

// import required files
const connection = require('../config/db');

console.log('model'); // where I am

module.exports = {
  history(userId) {
    return new Promise((resolve, reject) => {
      const queryTransferIn = `SELECT * FROM users u INNER JOIN transfers t ON t.user_id_from = u.id WHERE t.user_id_to = '${userId}'`;
      connection.query(queryTransferIn, function(errorTransferIn, resultTransferIn) {
        if (!errorTransferIn) {
          const queryTransferOut = `SELECT * FROM users u INNER JOIN transfers t ON t.user_id_to = u.id WHERE user_id_from = '${userId}'`;
          connection.query(queryTransferOut, function(errorTransferOut, resultTransferOut) {
            if (!errorTransferOut) {
              const queryPpobIn = `SELECT * FROM merchants m INNER JOIN ppob_in pi ON pi.merchant_id = m.id WHERE pi.user_id = '${userId}'`;
              connection.query(queryPpobIn, function(errorPpobIn, resultPpobIn) {
                if (!errorPpobIn) {
                  const queryPpobOut = `SELECT * FROM merchants m INNER JOIN ppob_out po ON po.merchant_id = m.id WHERE po.user_id = '${userId}'`;
                  connection.query(queryPpobOut, (errorPpobOut, resultPpobOut) => {
                    if (!errorPpobOut) {
                      resolve({
                        transferIn: resultTransferIn,
                        transferOut: resultTransferOut,
                        ppobIn: resultPpobIn,
                        ppobOut: resultPpobOut,
                      });
                    } else {
                      reject(errorPpobOut);
                    }
                  });
                } else {
                  reject(errorPpobIn);
                }
              });
            } else {
              reject(errorTransferOut);
            }
          });
        } else {
          reject(errorTransferIn);
        }
      });
    });
  },

  ppob(userId, opoType, nominalSign) {
    return new Promise((resolve, reject) => {
      console.log(nominalSign);
      // let cash = ''
      // if (opoType === 'opo_cash') {
      //   cash = 'OPO Cash'
      // } else {
      //   cash = 'OPO Point'
      // }
      const query = `SELECT ${opoType} FROM balances WHERE user_id = '${userId}'`;
      connection.query(query, function(error, result) {
        if (!error) {
          console.log(result);
          if (result[0][opoType] + nominalSign >= 0) {
            const queryPpob = `UPDATE balances SET ${opoType} = ${opoType} + ${nominalSign} WHERE user_id = "${userId}"`;
            connection.query(queryPpob, function(errorPpob, resultPpob) {
              if (!error) {
                resolve({
                  status: 201,
                  error: false,
                  message: 'PPOB transaction was successful',
                  result: {
                    opoType,
                    lastSaldo: parseInt(result[0][opoType]),
                    currentSaldo: parseInt(result[0][opoType]) + parseInt(nominalSign),
                  },
                });
              } else {
                reject(errorPpob);
              }
            });
          } else {
            resolve({
              status: 400,
              error: true,
              message: `Your ${opoType} was not enough`,
              result: {
                opoType,
                currentSaldo: parseInt(result[0][opoType]),
              },
            });
          }
        } else {
          reject(error);
        }
      });
    });
  },

  isEnough: function(userId, nominal) {
    return new Promise((resolve, reject) => {
      const queryCash = `SELECT opo_cash FROM balances WHERE user_id = '${userId}'`;
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
              });
            } else {
              resolve(result);
            }
          }
        } else {
          reject(error);
        }
      });
    });
  },

  transfer: function(userId, nominal, phoneTo) {
    return new Promise((resolve, reject) => {
      const queryPhone = `SELECT * FROM users WHERE phone = '${phoneTo}'`;
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
            const userIdTo = result[0].id;
            const queryFrom = `UPDATE balances SET opo_cash = opo_cash - ${nominal} WHERE user_id = "${userId}"`;
            connection.query(queryFrom, function(error, result) {
              if (!error) {
                const queryTo = `UPDATE balances SET opo_cash = opo_cash + ${nominal} WHERE user_id = "${userIdTo}"`;
                connection.query(queryTo, function(error, result) {
                  if (!error) {
                    const dataTransfer = {
                      id: uuidv4(),
                      user_id_from: userId,
                      user_id_to: userIdTo,
                      nominal: parseInt(nominal),
                      date: moment()
                        .format()
                        .split('+')[0],
                    };
                    const queryTransfer = `INSERT INTO transfers SET ?`;
                    connection.query(queryTransfer, dataTransfer, function(error, result) {
                      if (!error) {
                        resolve({
                          status: 200,
                          error: false,
                          message: `Transfer to ${phoneTo} was done successfully`,
                          result: dataTransfer,
                        });
                      } else {
                        reject(error);
                      }
                    });
                  } else {
                    reject(error);
                  }
                });
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
