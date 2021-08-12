const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

/* Database Connection Setup. */
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

/* Middleware Setup. */
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;
app.listen(port, function() {
    console.log(`Server started successfully on port: ${port}`);
})