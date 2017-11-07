var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');

var app = express();

var glob = require('glob');
var mongoose = require('mongoose');

const DB_USER = 'vanillacoding';
const DB_PASSWORD = 'hellovanilla';
const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@ds151355.mlab.com:51355/nss`;

var db = mongoose.connection;

db.on('error', () => {
  throw new Error('unable to connect to database at ' + DB_URL);
});

db.on('connecting', function(){
    console.info('trying to establish a connection to ' + DB_URL);
});

db.on('connected', () => {
  console.info('connected to database at ' + DB_URL);
});

db.on('disconnected', () => {
  console.info('closed connection at ' + DB_URL);
});

mongoose.connect(DB_URL, {
  useMongoClient: true
});

var models = glob.sync(__dirname + '/models/*.js');

models.forEach(function (model) {
  require(model);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
