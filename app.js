var express     = require('express');
var path        = require('path');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var routes  = require('./routes/index');

mongoose.connect('mongodb://localhost/sensor', function (err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Client IP:', ip);
    next();
});

app.use('/', routes);

module.exports = app;
