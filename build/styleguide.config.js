const ExtractTextPlugin = require('extract-text-webpack-plugin')
const resolve = file => require('path').resolve(__dirname, file)

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
	'../src/mixins/styleguide/styleguidist.js'
    ],
    showUsage: true,
    showCode: true,
    title: 'Fanatics, Inc.: Buoy Living Styleguide',
    styleguideDir: '../docs',
    template: '../src/styleguide.html',
    components: '../src/components/**/[A-Z]*.vue'
};
