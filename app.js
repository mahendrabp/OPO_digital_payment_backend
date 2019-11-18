const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');

// Main App
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());

app.use(cors());
// Port
const port = process.env.PORT || 5000;

// Connect to Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
