const path = require('path');

module.exports = {
    entry: './client/index.js',
    mode: 'development',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    devtool: 'source-maps',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ]
        }
      ]
    }
  }