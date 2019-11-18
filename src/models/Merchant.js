const uuidv4 = require('uuid/v4'); // for balances id

// import required files
const connection = require('../config/db');

console.log('merchant');

module.exports = {
  // get all merchants
  getAll: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM merchants';
      connection.query(sql, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  // get one merchant by id
  getOne: id => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM merchants where id='${id}'`;

      connection.query(sql, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  // create one merchant
  create: data => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO merchants SET ?';

      connection.query(sql, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  // update one merchant
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE merchants SET ? WHERE id = ?';

      connection.query(sql, [id, data], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  // delete one merchant
  delete: id => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM merchants WHERE id='${id}'`;

      connection.query(sql, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
};
