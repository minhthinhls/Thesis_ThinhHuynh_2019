const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();

// View engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

if (process.env.NODE_ENV === 'development') {
  console.log("Environment: " + process.env.NODE_ENV);
  const webpack = require('webpack');
  const config = require('./webpack.config');
  const compiler = webpack(config);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: config.output.publicPath,
    stats: {colors: true},
    historyApiFallback: true
  }));

  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 2000
  }));
}

// Using all file within folder ./dist, which was built using <$npm run build>
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// All router setup
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/api'));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handlers
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Finally, let's start our server...
var server = app.listen(8080, function () {
  console.log('Listening on port ' + server.address().port);
});

module.exports = app;
