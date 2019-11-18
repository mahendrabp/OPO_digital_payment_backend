// import required dependencies
const express = require('express');

// use dependencies
const Route = express.Router();

// import required files
const user = require('./routes/user');
const balance = require('./routes/balance');

console.log('index'); // where I am

// create routes
Route.use('/api/v1/balance', balance).use('/api/v1/user', user);

module.exports = Route;
