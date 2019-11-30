// import required dependencies
const express = require('express');
const Route = express.Router();
const {check} = require('express-validator');

// const { check, validationResult } = require('express-validator');

// import required files
const balanceController = require('../controllers/balance');
// const isAuthHelper = require('../helpers/isAuth');

console.log('route'); // where I am

Route
		.get('/history/:userId', balanceController.history)

		.post('/ppob/:type/:userId', [check('nominal').isInt({ min: 1 })], balanceController.ppob) //.isNumeric()

		.patch('/transfer/:userId', [check('phoneTo').isMobilePhone(), check('nominal').isInt({ min: 1 })], //isNumeric()
			balanceController.transfer);

module.exports = Route;
