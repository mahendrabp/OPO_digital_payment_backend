const uuidv4 = require('uuid/v4'); // for balances id

// import required files
const connection = require('../config/db');

console.log('ppobin');

module.exports = {
  // get all ppob_in
  getAll: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM ppob_in';
      connection.query(sql, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  // get one ppob_in by id
  getOne: id => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ppob_in where id='${id}'`;

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
      const sql = 'INSERT INTO ppob_in SET ?';

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
      const sql = `DELETE FROM ppob_in WHERE id='${id}'`;

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
