import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import js from '@eslint/js'
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginImport from 'eslint-plugin-import'
import typescriptEslintParser from '@typescript-eslint/parser'

const compat = new FlatCompat({
  baseDirectory: dirname.baseDirectory,
  recommendedConfig: js.configs.recommended,
})

export default [
  js.configs.recommended,
  ...compat.extends('airbnb', 'airbnb-typescript', 'plugin:@typescript-eslint/recommended', 'prettier'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslintEslintPlugin,
      react: eslintPluginReact,
      prettier: eslintPluginPrettier,
      'simple-import-sort': eslintPluginSimpleImportSort,
      import: eslintPluginImport,
    },
  },
  {
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: dirname.baseDirectory,
      },
    },
  },
  {
    rules: {
      "react/jsx-props-no-spreading": 0,
      "@typescript-eslint/explicit-module-boundary-types": "off",
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/no-throw-literal': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'no-shadow': 0,
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/semi': 'off',
      'no-debugger': 'error',
      'no-use-before-define': [
        'error',
        {
          functions: false,
          variables: false,
        },
      ],
      'no-undef': 'off',
      'no-restricted-globals': ['off'],
      'consistent-return': 'off',
      'no-plusplus': 'off',
      'prefer-destructuring': 'off',
      camelcase: 'warn',
      curly: 'error',
      eqeqeq: 'error',
      'no-param-reassign': ['error', { props: false }],
      'global-require': 0,
      'no-underscore-dangle': ['error', { allow: ['_data'] }],
      'object-curly-newline': ['error', {
        "ObjectExpression": { "multiline": true },
      }],
      'operator-linebreak': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'prettier/prettier': ['warn'],
      'jsx-a11y/label-has-associated-control': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'react/require-default-props': 0,
      'jsx-a11y/label-has-associated-control': [
        2,
        {
          some: ['nesting', 'id'],
        },
      ],
    },
  },
  ...compat.config({ env: { jest: true } }).map((config) => ({
    ...config,
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    rules: {
      ...config.rules,
    },
  })),
  { ignores: ['./next.config.js', '.next/**/*', 'eslint.config.mjs', '*.config.js', 'postcss.config.mjs'] },
]
