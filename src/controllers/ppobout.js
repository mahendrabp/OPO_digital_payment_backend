// import required dependencies
const config = require('../config/config'); // for login
const jwtSecret = config.jwtSecret; // for login
const bcrypt = require('bcrypt'); // for login and signup
const jwt = require('jsonwebtoken'); // for login
const {validationResult} = require('express-validator'); // for login and signup
const uuidv4 = require('uuid/v4'); // for signup
const moment = require('moment'); // for signup

// import required file
const ppoboutModel = require('../models/PpobOut');

module.exports = {
  // all merchant
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

  // get One Merchant
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

  // create merchant
  createPpobOut: (request, response) => {
    // create need a field
    const {
      merchant_id,
      user_id,
      nominal,
      cost,
      total,
      type,
      type_balance,
      type_transaction,
    } = request.body;

    const date = new Date();
    // data
    const data = {
      merchant_id,
      user_id,
      nominal,
      cost,
      total,
      type,
      type_balance,
      type_transaction,
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

  //   updateMerchant: (request, response) => {
  //     // need parameter in url
  //     const {id} = req.params;
  //     // field body name
  //     const {name} = req.body;
  //     // field logo
  //     const logo = req.file.filename;
  //     // data (name, logo)
  //     const data = {name, logo};

  //     merchantModel
  //       .update(id, data)
  //       .then(result => {
  //         response.status(200).json({
  //           status: 200,
  //           error: false,
  //           message: `Success update merchant with ID: ${id}`,
  //           data: result,
  //         });
  //       })
  //       .catch(error => {
  //         response.status(400).json({
  //           status: 400,
  //           error: true,
  //           message: 'Failed create a merchant',
  //           data: error,
  //         });
  //       });
  //   },

  deletePpobOut: (request, response) => {
    const {id} = req.params;

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
