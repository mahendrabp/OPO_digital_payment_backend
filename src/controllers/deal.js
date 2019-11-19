// import required dependencies
const config = require('../config/config'); // for login
const jwtSecret = config.jwtSecret; // for login
const bcrypt = require('bcrypt'); // for login and signup
const jwt = require('jsonwebtoken'); // for login
const {validationResult} = require('express-validator'); // for login and signup
const uuidv4 = require('uuid/v4'); // for signup
const moment = require('moment'); // for signup

// import required file
const dealModel = require('../models/Deal');

module.exports = {
  // all deal
  allDeal: (request, response) => {
    dealModel
      .getAll()
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: 'Success get all deal',
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed to get deal',
          data: error,
        });
      });
  },

  // get One deal
  getDeal: (request, response) => {
    dealModel
      .getOne()
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: 'Success get one deal',
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed get one deal',
          data: error,
        });
      });
  },

  // create deal
  createDeal: (request, response) => {
    // create need a field
    const {code, merchant_id, description, image} = req.body;
    const created_at = new Date();
    const updated_at = new Date();

    // data
    const data = {code, merchant_id, description, image};

    dealModel
      .create(data)
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: 'Success create a deal',
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed create a deal',
          data: error,
        });
      });
  },

  updateDeal: (request, response) => {
    // need parameter in url
    const {id} = req.params;
    // field body name
    const {name} = req.body;
    // field logo
    const logo = req.file.filename;
    // data (name, logo)
    const data = {name, logo};

    dealModel
      .update(id, data)
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: `Success update deal with ID: ${id}`,
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed create a deal',
          data: error,
        });
      });
  },

  deleteDeal: (request, response) => {
    const {id} = req.params;

    dealModel
      .delete(id)
      .then(result => {
        response.status(200).json({
          status: 200,
          error: false,
          message: `Success deelete deal with ID: ${id}`,
          data: result,
        });
      })
      .catch(error => {
        response.status(400).json({
          status: 400,
          error: true,
          message: 'Failed delete a deal',
          data: error,
        });
      });
  },
};
