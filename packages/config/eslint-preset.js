module.exports = {
  extends: ['next', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  rules: {
    'no-html-link-for-pages': 'off',
    'prettier/prettier': 'warn',
  },
};
