const connection = require('../config/db');

module.exports = {
  findOne: function(phone, userId) {
    return new Promise(function(resolve, reject) {
      connection.query('SELECT * FROM users WHERE phone = ?', phone, function(error, result) {
        console.log(result[0].id);
        console.log(userId);
        if (error) {
          reject(error);
        } else {
          if (result.length > 0 && result.length < 2) {
            if (result[0].id === userId) {
              console.log(1);
              resolve(result);
            } else {
              console.log(2);
              resolve({
                error: true,
                message: 'Token and phone does not match',
              });
            }
          } else {
            console.log(3);
            resolve({
              error: true,
              message: 'Can not find phone by given token',
            });
          }
        }
      });
    });
  },
};
