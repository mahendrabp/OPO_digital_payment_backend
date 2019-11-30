// import required dependencies
const express = require('express');

const Route = express.Router();
const { check } = require('express-validator');

// const { check, validationResult } = require('express-validator');

// import required files
const dealController = require('../controllers/deal');
// const isAuthHelper = require('../helpers/isAuth');

Route.get('/category/:cateId', dealController.readDealByCate)
  .get('/type/:getType', dealController.readDealByType)
  .get('/', dealController.readAllDeal)
  .get('/:dealId', dealController.readDeal)
  .post('/', dealController.createDeal)
  .patch('/:dealId', dealController.updateDeal)
  .delete('/:dealId', dealController.deleteDeal);

module.exports = Route;
