/**
 * Created by stevegentile on 5/5/16.
 */
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var childProcess = require('child_process');
var merge = require('webpack-merge');
var webpack = require('webpack');
var webpackconfig = require('./webpack.config.js');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
  specs: path.join(__dirname, 'spec')
};

process.env.BABEL_ENV = TARGET;
//ref: http://qiita.com/kimagure/items/f2d8d53504e922fe3c5c

const common = {
  resolve: {
    alias:{
      actions: path.resolve(__dirname, 'app', 'actions'),
      stores: path.resolve(__dirname, 'app', 'stores'),
      components: path.resolve(__dirname, 'app', 'components'),
      libs: path.resolve(__dirname, 'app', 'libs'),
      notifications: path.resolve(__dirname, 'app', 'components', 'notifications'),
      controls: path.resolve(__dirname, 'app', 'components', 'controls'),
      auth: path.resolve(__dirname, 'app', 'components', 'auth'),
      activity: path.resolve(__dirname, 'app', 'components', 'activity'),
      styles: path.resolve(__dirname, 'app', 'styles')
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {   test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'less'].join('!'))
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', "css-loader")
      },
      {   test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {   test: /\.(eot|svg|ttf|jpg|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {   test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?plugins[]=add-module-exports'],
        include: [PATHS.app, PATHS.specs]
      }
    ]
  }
};

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true, //just run once by default
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js' //just load this file
    ],
    preprocessors:{
      'tests.webpack.js': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
    },
    reporters: ['dots'], //format
    webpack: {
      resolve: common.resolve,
      devtool: 'inline-source-map',
      module: common.module,
      plugins: [
        new webpack.ProvidePlugin({
          "React": "react"
        }),
        new ExtractTextPlugin('/[name].css', {disabled: true})
      ]
    },
    webpackServer: {
      noInfo:  true //please don't spam the console when running in karma!
    }
  });
};