/* SERVER FILE TO RUN NODE ENVIRONMENT */
require('dotenv').config(); // Read <.env> file into $<process.env> global variable.
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const {fetchMongoDB} = require('./src/js/services/EthereumService');

/* All engine setup */
app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const config = require('./webpack.config');
  const compiler = webpack(config);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    path: config.output.path,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats: {colors: true},
    historyApiFallback: true
  }));

  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 2000
  }));
}

/* Public all file within folder ./public and ./dist, which was built using <$npm run build> */
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));

/* All router setup */
app.use('/api', require('./routes/api'));
app.use('/api', require('./routes/house'));
app.use('/api', require('./routes/user'));

/* Catch 404 and forward to error handler */
app.use(function (req, res, next) {
  next(createError(404));
});

/* Error handlers */
app.use(function (err, req, res, next) {
  /* Set locals, only providing error in development */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /* Render the error page */
  res.status(err.status || 500);
  res.render('error');
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/* Finally, let's start our server... */
var server = app.listen(8080, function () {
  console.log('Listening on port ' + server.address().port);
  const fetchTimerID = setInterval(() => {
    console.log('Initial Fetching MongoDB...');
  }, 5000);
  fetchMongoDB().then(() => {
    console.log('Fetching Mongo Success !');
  }).catch(error => {
    console.log('Fetching Mongo Failed ->', error);
  }).finally(() => {
    clearInterval(fetchTimerID);
    setInterval(() => {
      console.log('Automatically Fetching MongoDB...');
      fetchMongoDB().then(() => {
        console.log('Fetching Mongo Success !');
      });
    }, 5000);
  });
});

module.exports = app;
