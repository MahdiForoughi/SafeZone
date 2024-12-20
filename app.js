var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejsLayouts = require('express-ejs-layouts');
var mysql = require('mysql');
var db = require('./config/db')
var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express();

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(ejsLayouts);
app.set('layout', './layout')

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
