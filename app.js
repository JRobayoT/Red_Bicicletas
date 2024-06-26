/**
 * Faihd Enrique Pineda Duque
 * Juan David Robayo Torres
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var usuariosAPIRouter = require('./routes/api/usuarios')

var app = express();

var moongose = require('mongoose');
var mongoDB = 'mongodb://localhost/red_bicicletas';
moongose.connect(mongoDB);
moongose.Promise = global.Promise;
var db = moongose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error: '));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas',bicicletasAPIRouter);
app.use('/api/usuarios',usuariosAPIRouter);

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

var port = process.env.PORT || 3001; // Puerto predeterminado 3000 o el proporcionado por el entorno
app.listen(port, function () {
  console.log('La aplicación está corriendo en el puerto ' + port);
});

module.exports = app;
