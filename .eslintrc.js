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
    'max-len': [1, 120, 2, {'ignoreStrings': true}],
    'prefer-const': ['error', {'destructuring': 'any' }],
    'no-undef': 'error',
    'no-multi-assign': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'object-curly-spacing': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never']
  },
  'globals': {},
}
