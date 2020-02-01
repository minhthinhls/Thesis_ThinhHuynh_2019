/* SERVER FILE TO RUN NODE ENVIRONMENT */
require('dotenv').config(); // Read <.env> file into $<process.env> global variable.
const express = require('express');
const path = require('path');
const helmet = require('helmet');

// Port should match webpack config URL
const port = 3000;

const app = express();

/* Enable Hot Module Replacement */
if (process.env.NODE_ENV === 'development') {
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
/* End Hot Module Replacement addition */

// Secure the app using "helmet.js" module
app.use(helmet());

// Using all file within folder ./dist, which was built using <$npm run build>
app.use(express.static(path.join(__dirname, 'dist')));

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${port}`);
});
