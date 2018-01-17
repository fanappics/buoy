module.exports = {
  webpackConfig: {
    module: {
      rules: [
        // Vue loader
        {
          test: /\.vue$/,
          exclude: /node_modules/,
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
  showUsage: true,
  showCode: true,
  defaultExample: true,
  title: "Fanatics, Inc.: Buoy Living Styleguide",
  styleguideDir: "../docs",
  template: "../src/styleguide.html",
  components: '../src/components/**/[A-Z]*.vue'
};
