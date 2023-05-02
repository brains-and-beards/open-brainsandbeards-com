module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended'
  ],
  plugins: ['@typescript-eslint', 'react-hooks', 'react', 'prettier', 'eslint-comments'],
  env: {
    es6: true,
    jest: true,
    node: true
  },
  globals: {
    React: true,
    JSX: true
  },
  ignorePatterns: ['public/**/*', 'gatsby-config.ts'],

  rules: {
    // Typescript Plugin

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': ['error', { variables: false, functions: false }],
    '@typescript-eslint/no-var-requires': 'off',

    // Temporarily disabled, because it crashes eslint
    // 'react-native/no-raw-text': ['error', { skip: ['SystemText'] }],
    'react-native/no-raw-text': 'off',
    'sort-imports': 'off',

    // General

    'prettier/prettier': 'error',
    'import/order': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],

    // ESLint Comments Plugin

    'eslint-comments/no-aggregating-enable': 1, // disallows eslint-enable comments for multiple eslint-disable comments
    'eslint-comments/no-unlimited-disable': 1, // disallows eslint-disable comments without rule names
    'eslint-comments/no-unused-disable': 1, // disallow disables that don't cover any errors
    'eslint-comments/no-unused-enable': 1, // // disallow enables that don't enable anything or enable rules that weren't disabled

    // React Hooks Plugin

    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',

    // React Plugin

    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off'
  }
}
