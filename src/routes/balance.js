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
		.post('/ppob/:type/:userId', [check('nominal').isNumeric()], balanceController.ppob)

		.patch('/transfer/:userId', [check('phoneTo').isMobilePhone(), check('nominal').isNumeric()],
			balanceController.transfer);

module.exports = Route;
