var webpack = require('webpack');

module.exports = {
  entry: './assets/js/app.js',
  output: {
    filename: './assets/js/app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
