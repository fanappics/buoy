module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'node': true,
    'jest/globals': true,
  },
  'extends': 'standard',
  // required to lint *.vue files
  'plugins': [
    'html',
    'jest',
    'vue',
    'import',
    'node',
    'promise',
    'standard',
  ],
  // add your custom rules here
  'rules': {
    'quotes': ['warn', 'single', { 'avoidEscape': true }],
    'max-len': [1, 80, 2, {'ignoreComments': true, 'ignoreStrings': true}],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'prefer-const': ['error', {'destructuring': 'any',}],
    'no-undef': 'error',
    'no-multi-assign': 'error',
    'arrow-body-style': ['error', 'always'],
    'no-confusing-arrow': ['error', {'allowParens': false}],
  },
  'globals': {},
}
