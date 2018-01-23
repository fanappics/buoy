module.exports = {
  webpackConfig: {
    module: {
      rules: [
        // Vue loader
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  },
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
