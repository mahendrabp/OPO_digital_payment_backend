// import required dependencies
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4'); // for balances id

// import required files
const connection = require('../config/db');
console.log('model'); // where I am

module.exports = {

  read: function(userId) {
    return new Promise(function(resolve, reject) {
      const query = `SELECT * FROM users INNER JOIN balances ON users.id = balances.user_id WHERE users.id = '${userId}'`
      connection.query(query, function(error, result) {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },

  updateUserValidation: function(key, updateData) {
    return new Promise(function(resolve, reject) {
      console.log(key + ' used');
      console.log(updateData[key]);
      const queryValidation = `SELECT * FROM users WHERE ${key} = "${updateData[key]}"`;
      connection.query(queryValidation, function(error, result) {
        console.log(result);
        if (!error) {
          if (result.length > 0) {
            console.log(key + ' used');
            resolve({
              status: 400,
              error: true,
              message: 'The ' + key + ' was already used by other',
              result: {},
            });
          } else {
            resolve(result);
          }
        } else {
          reject(error);
        }
      });
    });
  },

  updateUser: function(updateData, userId) {
    return new Promise(function(resolve, reject) {
      const queryId = `SELECT * FROM users WHERE id = '${userId}'`;
      connection.query(queryId, [updateData], function(error, result) {
        if (!error) {
          if (result.length === 0) {
            resolve({
              status: 400,
              error: true,
              message: 'User was not found',
              result: {},
            });
          } else {
            const queryUpdate = `UPDATE users SET ? WHERE id = '${userId}'`;
            connection.query(queryUpdate, [updateData], function(
              error,
              result,
            ) {
              if (!error) {
                resolve(result);
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

  login1: function(data_login) {
    return new Promise(function(resolve, reject) {
      const query = 'SELECT * FROM users WHERE phone = ?';
      connection.query(query, data_login.phone, function(error, result) {
        if (!error) {
          if (result.length == 0) {
            resolve({
              status: 400,
              error: true,
              message: 'Phone was not registered',
              result: {},
            });
          } else {
            resolve(data_login);
          }
        } else {
          reject(error);
        }
      });
    });
  },

  login2: function(data_login) {
    return new Promise(function(resolve, reject) {
      const query =
        'SELECT * FROM users INNER JOIN balances ON users.id = balances.user_id WHERE phone = ?';
      connection.query(query, data_login.phone, function(error, result) {
        if (!error) {
          // const hash = result[0].security_code;
          // const name = result[0].name;
          // const data = {
          //   'name': name,
          //   'hash': hash,
          // };
          // resolve(data);
          resolve(result[0]);
        } else {
          reject(error);
        }
      });
    });
  },

  signup1: function(data_signup) {
    return new Promise(function(resolve, reject) {
      const queryPhone = 'SELECT * FROM users WHERE phone = ?';
      connection.query(queryPhone, data_signup.phone, function(error, result) {
        if (!error) {
          if (result.length > 0) {
            // switch to login
            resolve({
              status: 201,
              error: false,
              message: 'Phone was already used by other',
              result: {
                phoneAlready: true,
              },
            });
          } else {
            resolve({
              status: 201,
              error: false,
              message: 'Phone was not already used by other',
              result: {
                phoneAlready: false,
              },
            });
          }
        } else {
          reject(error);
        }
      });
    });
  },

  signup2: function(data_signup) {
    return new Promise(function(resolve, reject) {
      const queryInsert = 'INSERT INTO users SET ?';
      connection.query(queryInsert, data_signup, function(error, result) {
        if (!error) {
          const id = uuidv4();
          const init_balances = {
            id,
            opo_cash: 0,
            opo_point: 0,
            user_id: data_signup.id,
          };
          const queryBalances = 'INSERT INTO balances SET ?';
          connection.query(queryBalances, init_balances, function(
            error,
            result,
          ) {
            if (!error) {
              resolve(result);
            } else {
              reject(error);
            }
          });
          // resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
};
