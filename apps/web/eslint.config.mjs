import next from '@next/eslint-plugin-next'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    settings: {
      next: {
        rootDir: ['apps/web'],
      },
    },
  },

  {
    ignores: [
      '**/shared/ui/atoms/**/*',
      'shared/lib/utils.ts',
      'components.json',
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'dist/**',
      'next-env.d.ts',
    ],
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@next/next': next,
      '@typescript-eslint': tseslint,
      prettier,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,

      ...eslintConfigPrettier.rules,

      'prettier/prettier': 'error',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/set-state-in-effect': 'off',

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
])
