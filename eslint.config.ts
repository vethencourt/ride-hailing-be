import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import type { Linter } from 'eslint'

const config: Linter.Config[] = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,js,mjs}']
  },
  {
    ignores: ['**/dist/**', '**/node_modules/**']
  },
  {
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true // Links to your tsconfig.json
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
          alwaysTryTypes: true
        },
        node: true
      }
    },
    rules: {
      ...prettierConfig.rules,
      eqeqeq: ['error', 'smart'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }],
      'import/extensions': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'import/named': 'off',
      'import/no-unresolved': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: true, bundledDependencies: ['globals'] }
      ],
      'import/order': [
        2,
        {
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
            caseInsensitive: true
          },
          distinctGroup: false,
          groups: [
            'builtin',
            'external',
            'type',
            'internal',
            ['parent', 'sibling', 'index'],
            'object'
          ]
        }
      ]
    }
  }
]

export default config
