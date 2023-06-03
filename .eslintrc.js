// @ts-check
'use strict';

module.exports = ((/** @type {import('eslint').Linter.Config} */ e) => e)({
  extends: './node_modules/@arthurka/eslint',
  rules: {
    'no-process-env': 'error',
    'arrow-body-style': 'off',
    'react/jsx-indent': 'warn',
    'react/jsx-closing-tag-location': 'warn',
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
});
