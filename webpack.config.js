/* eslint-disable no-process-env */
// @ts-check
'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const publicDir = path.resolve('public');

const PORT = Number(process.env.PORT);
if(!PORT) {
  throw new Error('Something went wrong. cc1yw9');
}

module.exports = ((/** @type {import('webpack-dev-server').WebpackConfiguration} */ e) => e)({
  mode: 'development',
  entry: path.resolve('src/index.tsx'),
  output: {
    path: publicDir,
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve('src/index.html') }),
    new ForkTsCheckerWebpackPlugin(),
    new ReactRefreshWebpackPlugin(),
    new Dotenv({ systemvars: true }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
  devtool: 'source-map',
  devServer: {
    port: PORT,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: publicDir,
    },
  },
});
