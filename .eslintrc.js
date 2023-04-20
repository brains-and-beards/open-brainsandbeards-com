module.exports = {
  globals: {
    __PATH_PREFIX__: true
  },
  extends: [`react-app`, 'plugin:react/recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/no-unescaped-entities': 'off'
  }
}
