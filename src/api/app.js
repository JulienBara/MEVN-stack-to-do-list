var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

var toDoItemsRouter = require('./routes/to-do-items');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/to-do-items', toDoItemsRouter);

// setup swagger doc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To do items API',
      version: '1.0.0', 
    },
  },
  apis: ['./routes/to-do-items.js'],
};
const swaggerSpec = swaggerJSDoc(options);

// setup swagger ui
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
