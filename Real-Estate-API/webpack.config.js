const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const entries = ['./server.js'];

if (process.env.NODE_ENV === 'development') {
  entries.push('webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr&timeout=4000');
}

const config = {
  mode: 'development',
  entry: entries,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
    publicPath: '/',
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // If you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
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
      },
      {
        test: /\.html$/, // Loads the javascript into html template provided.
        use: [{loader: "html-loader"}] // Entry point is set below in HtmlWebPackPlugin in Plugins
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
    port: 8080, // Default port: 8080
    hot: true, // Hot module replacement without refreshing all contents.
    open: false, // Default browser: Google Chrome.
    proxy: { // A request to </api/users> will proxy to <http://localhost:8080/api/users>.
      '^/api/*': {
        target: 'http://localhost:8080/api/',
        secure: false
      }
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html",
      excludeChunks: ['server']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

module.exports = config; 
