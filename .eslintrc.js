module.exports = {
  globals: {
    __PATH_PREFIX__: true
  },
  extends: [`react-app`, 'plugin:react/recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier', '@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { variables: false, functions: false }],
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-duplicate-imports': 'error',
    'react/no-unescaped-entities': 'off'
  }
}
