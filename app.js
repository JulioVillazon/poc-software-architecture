var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const logger = require('./helpers/logger')
const i18nLib = require('i18n')
const { i18nText } = require('./helpers/i18n')
const payitError = require('./exception/PayitError')
const cors = require('cors')


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var reservationRouter = require('./routes/reservation');
var classroomRouter = require('./routes/classroom');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(i18nLib.init)
app.use(morgan('combined', { stream: logger.stream }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/reservation', reservationRouter);
app.use('/classroom', classroomRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  throw payitError('NOT_FOUND', 404, 'NOT_FOUND')
});

app.use((err, req, res, next) => {
    (process.env.NODE_ENV !== 'test') && logger.debug(err)
  if (err.response) {
    const {
      status,
      statusText,
      data = {}
    } = err.response
    const code = (data.error && data.error.code) || statusText || 'SERVICE_FAIL'
    const message = data.error && data.error.message
    logger.error(`Error with status ${err.status} - ${err.message} from ${err.request.url} with payload and response`, err)
    res.status(err.status || status).json({ error: {
      code,
      message: i18nText('SERVICE_FAIL', { errorMessage: message || err.message || 'Something went wrong' })
    } })
  } else if (err.request) {
    logger.error(`Error with status 500 - ${err.message} from ${err.request.url} with error`, err)
    res.status(500).json({ error: {
      code: 'SERVICE_TIMEOUT',
      message: i18nText('SERVICE_TIMEOUT')
    } })
  } else {
    const code = err.code || 'UNHANDLED_ERROR'
    logger.error(`Error with status ${err.status} - ${err.message} from ${req.originalUrl} with error`, err)
    res.status(err.status || 500).json({ error: {
      code,
      message: i18nText(code, { errorMessage: err.message })
    } })
  }

})

module.exports = app;
