const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractPlugin = ExtractTextPlugin.extract({
  use: [
    { loader: 'css-loader', options: { sourceMap: true } },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    { loader: 'stylus-loader', options: { sourceMap: true } }
  ]
})

module.exports = {
  webpackConfig: require('./webpack.dev.config.js'),
  mixins: [
    '../src/mixins/styleguide/styleguidedist.js'
  ],
  showUsage: true,
  showCode: true,
  defaultExample: true,
  title: "Fanatics, Inc.: Buoy Living Styleguide",
  styleguideDir: "../docs",
  template: "../src/styleguide.html",
  components: '../src/components/**/[A-Z]*.vue'
};
