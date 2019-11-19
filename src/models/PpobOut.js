const uuidv4 = require('uuid/v4'); // for balances id

// import required files
const connection = require('../config/db');

console.log('ppobout');

module.exports = {
  // get all ppob_out
  getAll: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM ppob_out';
      connection.query(sql, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  // get one ppob_out by id
  getOne: id => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ppob_out where id='${id}'`;

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
      const sql = 'INSERT INTO ppob_out SET ?';

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

  // delete one merchant
  delete: id => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM ppob_out WHERE id='${id}'`;

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
