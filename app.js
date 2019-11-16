// import required dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

// import required files
const config = require('./src/config/config');
const routerNav = require('./src/index');

// main app
const app = express();

// use dependencies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(logger('dev'));

// use files
const port = config.port;
app.use('/', routerNav);

// listening port
app.listen(port, function() {
  console.log(`\n Server listening on port ${port} \n`);
});

module.exports = app;
