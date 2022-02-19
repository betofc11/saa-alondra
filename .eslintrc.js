module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
    commonjs: true
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
    'react'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn'
  }
}
