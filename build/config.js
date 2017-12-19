const base = require('./webpack.prod.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const OptimizeJsPlugin = require('optimize-js-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const version = process.env.VERSION || require('../package.json').version

const builds = {
  development: {
    config: {
      output: {
        filename: 'buoy.js',
        libraryTarget: 'umd'
      },
      plugins: [
        new ExtractTextPlugin('buoy.css')
      ]
    }
  },
  production: {
    config: {
      output: {
        filename: 'buoy.min.js',
        libraryTarget: 'umd'
      },
      plugins: [
        new ExtractTextPlugin('buoy.min.css')
      ]
    },
    env: 'production'
  },
  /*
  esm: {
    filename: 'buoy.esm.js',
    libraryTarget: 'esm',
    env: 'production'
  },
  commonjs: {
    filename: 'buoy.common.js',
    libraryTarget: 'commonjs',
    env: 'production'
  }
  */
}

function genConfig (opts) {
  const config = merge({}, base, opts.config)

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': opts.env || 'development'
    })
  ])

  if (opts.env) {
    config.plugins = config.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          postcssZindex: false
        },
        canPrint: false
      }),
      new webpack.BannerPlugin({
        banner: `/*!
* buoy v${version}
* Forged by John Leider
* Released under the MIT License.
*/     `,
        raw: true,
        entryOnly: true
      }),
      new OptimizeJsPlugin({
        sourceMap: false
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    ])
  }

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  module.exports = Object.keys(builds).map(name => genConfig(builds[name]))
}
