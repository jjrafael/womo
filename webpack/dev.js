const webpack = require('webpack')
const workingDir = process.cwd()
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const _merge = require('lodash.merge')
const _cloneDeep = require('lodash.clonedeep')

const {
  baseConfig,
  jsLoader,
  cssLoader,
  postCssLoader,
  sassLoader,
  htmlWebpackPlugin,
  copyWebpackPlugin,
  environmentPlugin,
  resolve,
  loadEnv
} = require('./common.js')
let config = _cloneDeep(baseConfig)

loadEnv()

_merge(config, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      jsLoader,
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          cssLoader,
          postCssLoader,
          sassLoader
        ]
      }
    ]
  },
  plugins: [environmentPlugin, htmlWebpackPlugin, copyWebpackPlugin],
  resolve
})

module.exports = config