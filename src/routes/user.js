// import required dependencies
const express = require('express');
const Route = express.Router();
const {check} = require('express-validator');

// const { check, validationResult } = require('express-validator');

// import required files
const userController = require('../controllers/user');
console.log('route'); // where I am

Route
    .post('/login', [check('phone').isMobilePhone(), check('securityCode').isNumeric()],
    	userController.login)
    .post('/signup', [check('name').matches(/^[A-Za-z\/\s\.,'-]+$/).isLength({ min:3 }), check('phone').isMobilePhone(),
    	check('email').isEmail(), check('securityCode').isNumeric()], userController.signup);

module.exports = Route;
