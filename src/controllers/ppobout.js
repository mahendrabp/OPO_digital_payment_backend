// import required dependencies
const config = require('../config/config'); // for login
const jwtSecret = config.jwtSecret; // for login
const bcrypt = require('bcrypt'); // for login and signup
const jwt = require('jsonwebtoken'); // for login
const { validationResult } = require('express-validator'); // for login and signup
const uuidv4 = require('uuid/v4'); // for signup
const moment = require('moment'); // for signup

// import required file
const ppoboutModel = require('../models/PpobOut');

module.exports = {
  // all ppobout
  allPpobOut: (request, response) => {
    ppoboutModel
      .getAll()
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: 'Success get all ppob out',
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed to get ppob out',
          data: error,
        });
      });
  },

  // get One ppo out
  getPpobOut: (request, response) => {
    ppoboutModel
      .getOne()
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: 'Success get one ppob out',
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed get one ppob out',
          data: error,
        });
      });
  },

  // create ppob out
  createPpobOut: (request, response) => {
    // create need a field
    const id = uuidv4();
    const { merchant_id, user_id, nominal, cost, total, opo_type, transaction_type } = request.body;

    const date = moment()
      .format()
      .split('+')[0];
    // data
    const data = {
      id,
      merchant_id,
      user_id,
      nominal,
      cost,
      total,
      opo_type,
      transaction_type,
      date,
    };

    ppoboutModel
      .create(data)
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: 'Success create a ppob out',
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed create a ppob out',
          data: error,
        });
      });
  },

  deletePpobOut: (request, response) => {
    const { id } = request.params;

    merchantModel
      .delete(id)
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: `Success delete ppob out with ID: ${id}`,
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed delete a ppob out',
          data: error,
        });
      });
  },
};
