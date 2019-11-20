// import required dependencies
const express = require('express');
const Route = express.Router();
const {check} = require('express-validator');

// const { check, validationResult } = require('express-validator');

// import required files
const userController = require('../controllers/user');
const isAuthHelper = require('../helpers/isAuth');
// const imageUpload = require('../helpers/multer')

console.log('route'); // where I am

Route
  .get('/get/:userId', isAuthHelper.getToken, userController.read)

  .patch('/edit/:userId', isAuthHelper.getToken, userController.update) // imageUpload.single('photo'),

  .post('/login/step1', [check('phone').isMobilePhone()], userController.login1)
  
  .post(
    '/login/step2',
    [
      check('securityCode')
        .isNumeric()
        .isLength({min: 6, max: 6}),
    ],
    userController.login2,
  )

  .post(
    '/signup/step1',
    [
      check('name')
        .matches(/^[A-Za-z\/\s\.,'-]+$/)
        .isLength({min: 3}),
      check('phone').isMobilePhone(),
      check('email').isEmail(),
    ],
    userController.signup1,
  )

  .post(
    '/signup/step2',
    [
      check('securityCode')
        .isNumeric()
        .isLength({min: 6, max: 6}),
    ],
    userController.signup2,
  );

module.exports = Route;
