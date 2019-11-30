const connection = require('../config/db');

module.exports = {
  readAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM merchants m INNER JOIN deals d ON d.merchant_id = m.id';
      connection.query(query, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  read(dealId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM merchants m INNER JOIN deals d ON d.merchant_id = m.id where d.id = '${dealId}'`;
      connection.query(query, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  create(createData) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO deals SET ?';
      connection.query(query, createData, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  update(dealId, updateData) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE deals SET ? WHERE id = '${dealId}'`;
      connection.query(query, updateData, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  delete(dealId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM deals WHERE id = '${dealId}'`;
      connection.query(query, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  readDealByCate(cateId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM merchants m INNER JOIN deals d ON d.merchant_id = m.id where d.category_id = '${cateId}'`;
      connection.query(query, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  readDealByType(getType) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM merchants m INNER JOIN deals d ON d.merchant_id = m.id where d.type = '${getType}'`;
      connection.query(query, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
};
