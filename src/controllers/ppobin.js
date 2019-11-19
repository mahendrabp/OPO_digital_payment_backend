// import required dependencies
const config = require('../config/config'); // for login
const jwtSecret = config.jwtSecret; // for login
const bcrypt = require('bcrypt'); // for login and signup
const jwt = require('jsonwebtoken'); // for login
const {validationResult} = require('express-validator'); // for login and signup
const uuidv4 = require('uuid/v4'); // for signup
const moment = require('moment'); // for signup

// import required file
const ppobinModel = require('../models/PpobIn');

module.exports = {
  // all merchant
  allPpobIn: (request, response) => {
    ppobinModel
      .getAll()
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: 'Success get all ppob in',
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed to get ppob in',
          data: error,
        });
      });
  },

  // get One Merchant
  getPpobIn: (request, response) => {
    ppobinModel
      .getOne()
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: 'Success get one ppob in',
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed get one ppob in',
          data: error,
        });
      });
  },

  // create merchant
  createPpobIn: (request, response) => {
    // create need a field
    const id = uuidv4();
    const {
      merchant_id,
      user_id,
      total,
      opo_type,
      transaction_type,
    } = request.body;

    const date = moment()
      .format()
      .split('+')[0];
    // data
    const data = {
      id,
      merchant_id,
      user_id,
      total,
      opo_type,
      transaction_type,
      date,
    };

    ppobinModel
      .create(data)
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: 'Success create a ppob in',
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed create a ppob in',
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

  deletePpobIn: (request, response) => {
    const {id} = request.params;

    merchantModel
      .delete(id)
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: `Success delete ppob in with ID: ${id}`,
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed delete a ppob in',
          data: error,
        });
      });
  },
};
