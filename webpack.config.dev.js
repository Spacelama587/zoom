const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: './js/index.js',
    meeting: './js/meeting.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    hashDigestLength: 5,
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    'babel-polyfill': 'babel-polyfill',
    react: 'React',
    'react-dom': 'ReactDOM',
    redux: 'Redux',
    'redux-thunk': 'ReduxThunk',
    lodash: {
      commonjs: 'lodash',
      amd: 'lodash',
      root: '_',
      var: '_'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './meeting.html',
      chunks: ['meeting'],
      filename: 'meeting.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
