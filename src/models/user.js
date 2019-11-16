// import required dependencies
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// import required files
const connection = require('../config/db');
console.log('model'); // where I am

module.exports = {

  login: function(data_login) {
    return new Promise( function(resolve, reject) {
      const query = 'SELECT * FROM users WHERE phone = ?'
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
                const hash = result[0].security_code;
                const name = result[0].name;
                const data = {
                  'name': name,
                  'hash': hash,
                };

                resolve(data);
              }
            } else {
              reject(error);
            }
          });
    });
  },

  signup: function(data_signup) {
    return new Promise( function(resolve, reject) {
      const queryPhone = 'SELECT * FROM users WHERE phone = ?'
      connection.query(queryPhone, data_signup.phone, function(error, result) {
            if (!error) {
              if (result.length > 0) {
                // reject(new Error('username was used by other'));
                resolve({
                  status: 400,
                  error: true,
                  message: 'Phone was already used by other',
                  result: {},
                });
              } else {
                const queryInsert = 'INSERT INTO users SET ?'
                connection.query(queryInsert, data_signup, function(error, result) {
                      if (!error) {
                        resolve(result);
                      } else {
                        reject(error);
                      }
                    }
                );
              }
            } else {
              reject(error);
            }
          }
      );
    });
  },
};
