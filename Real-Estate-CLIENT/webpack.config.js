/* WEBPACK JAVASCRIPT CONFIG FILE */
require('dotenv').config();
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entries = ['./src/index.js'];

if (process.env.NODE_ENV === 'development') {
  entries.push('webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&timeout=4000');
}

const config = {
  mode: 'development',
  entry: entries,
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpege: {
                progressive: true,
                quality: 80,
              },
              optipng: {
                optimizationLevel: 7,
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/', // All paths are now public
    host: `localhost`, // Default domain: 127.0.0.1
    port: 3000, // Default port: 8080
    hot: true, // Hot module replacement without refreshing all contents.
    open: true, // Default browser: Google Chrome.
    proxy: { // A request to </api/users> will proxy to <http://localhost:8080/api/users>.
      '^/api/*': {
        target: 'http://localhost:8080/api/',
        secure: false
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'assets/favicon.ico',
    }),
    new webpack.DefinePlugin({
      'process.env.NETWORK_ID': JSON.stringify(process.env.NETWORK_ID),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.WEB3_HTTP_PROVIDER': JSON.stringify(process.env.WEB3_HTTP_PROVIDER || 'http://localhost:7545')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config; 
