// import required dependencies
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const { jwtSecret } = config;

// const expressjwt = require('express-jwt')
currentUserModel = require('../models/CurrentUser');

// We are assuming that the JWT will come in the header Authorization
// but it could come in the req.body or in a query param,
// you have to decide what works best for you.

module.exports = {
  getToken(request, response, next) {
    if (
      request.headers.authorization &&
      request.headers.authorization.split(' ')[0] === 'hello00opo'
    ) {
      const token = request.headers.authorization.split(' ')[1];
      decoded = jwt.decode(token, jwtSecret);

      if (decoded.exp <= Date.now().valueOf() / 1000) {
        console.log(Date.now().valueOf() / 1000);
        console.log(decoded.exp); // use global time
        response.status(401).json({
          status: 401,
          error: true,
          message: 'Expired token. Log out and log in again.',
          result: 'Unauthorized',
        });
      } else {
        const userId = request.params.userId;
        currentUserModel
          .findOne(decoded.data_login.phone, userId)
          .then(result => {
            if (result.error) {
              console.log('wrong token');
              response.status(401).json({
                status: 401,
                error: true,
                message: 'Wrong token',
                result: 'Unauthorized',
              });
            } else {
              console.log(`${decoded.data_login.phone} was authorized`);
              return next();
            }
          })
          .catch(error => {
            response.status(401).json({
              status: 401,
              error: true,
              message: 'Invalid token',
              result: 'Unauthorized',
            });
          });
      }
    } else {
      response.status(401).json({
        status: 401,
        error: true,
        message: 'Invalid token',
        result: 'Unauthorized',
      });
    }
  },
};
