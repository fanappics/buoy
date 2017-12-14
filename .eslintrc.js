module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    'jest/globals': true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html',
    'jest',
    'vue',
    'import',
    'node',
    'promise',
    'standard'
  ],
  // add your custom rules here
  rules: {},
  globals: {}
}
