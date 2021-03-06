const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

var extractPlugin = ExtractTextPlugin.extract({
  use: [
    { loader: 'css-loader', options: { sourceMap: true } },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    { loader: 'stylus-loader', options: { sourceMap: true } }
  ]
})

// Helpers
const resolve = file => require('path').resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  devtool: '#source-map',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    library: 'buoy'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                stylus: extractPlugin
              }
            }
          },
          'eslint-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: extractPlugin,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader?name=img/[name].[ext]?[hash]',
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ]
})
