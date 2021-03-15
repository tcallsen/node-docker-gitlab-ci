var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var infoRouter = require('./routes/info');
var defaultRouter = require('./routes/default');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/info', infoRouter);
app.use('*', defaultRouter);

module.exports = app;
