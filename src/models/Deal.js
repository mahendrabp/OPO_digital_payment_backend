const uuidv4 = require('uuid/v4'); // for balances id

// import required files
const connection = require('../config/db');

console.log('deals');

module.exports = {
  // get all deals
  getAll: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM deals';
      connection.query(sql, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  // get one deal by id
  getOne: id => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM deals where id='${id}'`;

      connection.query(sql, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  // create one deal
  create: data => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO deals SET ?';

      connection.query(sql, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  // update one deal
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE deals SET ? WHERE id = ?';

      connection.query(sql, [id, data], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  // delete one deal
  delete: id => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM deals WHERE id='${id}'`;

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
