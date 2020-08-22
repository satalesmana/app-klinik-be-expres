var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./db');
global.__root   = __dirname + '/'; 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;