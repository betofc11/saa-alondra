module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
    commonjs: true,
    'jest/globals': true
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn',
    'react/prop-types': 'off'
  }
}
