const express = require('express');

const Route = express.Router();
const { check } = require('express-validator');

const merchantController = require('../controllers/merchant');

Route.get('/merchant', merchantController.allMerchant)
  .get('/merchant/:id', merchantController.getMerchant)
  .post('/merchant', merchantController.createMerchant)
  .patch('/merchant/:id', merchantController.updateMerchant)
  .delete('merchant/:d', merchantController.deleteMerchant);
