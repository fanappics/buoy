const ExtractTextPlugin = require('extract-text-webpack-plugin')
const resolve = file => require('path').resolve(__dirname, file)
const glob = require("glob")

const extractPlugin = ExtractTextPlugin.extract({
  use: [
    { loader: 'css-loader', options: { sourceMap: true } },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    { loader: 'stylus-loader', options: { sourceMap: true } }
  ]
})

module.exports = {
  webpackConfig: Object.assign(
    {},
    require('./webpack.prod.config.js'),{
      devServer: {
	contentBase: resolve('../docs'),
	publicPath: '/docs/',
	disableHostCheck: true
      }
    }),
    mixins: [
	glob.sync('../src/mixins/*/*.*')
    ],
    showUsage: true,
    showCode: true,
    defaultExample: true,
    title: "Fanatics, Inc.: Buoy Living Styleguide",
    styleguideDir: "../docs",
    template: "../src/styleguide.html",
    components: '../src/components/**/[A-Z]*.vue'
};
