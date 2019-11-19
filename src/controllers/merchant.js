// import required dependencies
const config = require('../config/config'); // for login
const jwtSecret = config.jwtSecret; // for login
const bcrypt = require('bcrypt'); // for login and signup
const jwt = require('jsonwebtoken'); // for login
const {validationResult} = require('express-validator'); // for login and signup
const uuidv4 = require('uuid/v4'); // for signup
const moment = require('moment'); // for signup

// import required file
const merchantModel = require('../models/Merchant');

module.exports = {
  // all merchant
  allMerchant: (request, response) => {
    merchantModel
      .getAll()
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: 'Success get all merchant',
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed to get merchant',
          data: error,
        });
      });
  },

  // get One Merchant
  getMerchant: (request, response) => {
    merchantModel
      .getOne()
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: 'Success get one merchant',
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed get one merchant',
          data: error,
        });
      });
  },

  // create merchant
  createMerchant: (request, response) => {
    // create need a field
    const {name} = req.body;
    const logo = req.file.filename;

    // data
    const data = {name, logo};

    merchantModel
      .create(data)
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: 'Success create a merchant',
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed create a merchant',
          data: error,
        });
      });
  },

  updateMerchant: (request, response) => {
    // need parameter in url
    const {id} = req.params;
    // field body name
    const {name} = req.body;
    // field logo
    const logo = req.file.filename;
    // data (name, logo)
    const data = {name, logo};

    merchantModel
      .update(id, data)
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: `Success update merchant with ID: ${id}`,
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed create a merchant',
          data: error,
        });
      });
  },

  deleteMerchant: (request, response) => {
    const {id} = req.params;

    merchantModel
      .delete(id)
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: `Success deelete merchant with ID: ${id}`,
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed delete a merchant',
          data: error,
        });
      });
  },
};
