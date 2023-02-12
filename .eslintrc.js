module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
    {
      files: ['src/redux/slices/*Slice.js'],
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // semi: ['error', 'never'],
    'import/no-cycle': 0,
    'import/prefer-default-export': 0,
    'max-len': ['error', { code: 100 }],
    'no-console': 0,
    'no-underscore-dangle': 0,
    'react/jsx-uses-react': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
  },
};
