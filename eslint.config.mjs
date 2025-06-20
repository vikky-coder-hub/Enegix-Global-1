import { FlatCompat } from '@eslint/eslintrc'
 
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})
 
const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    overrides: [
      {
        // Disable no-explicit-any for the globe component
        files: ['**/globe.tsx'],
        rules: {
          '@typescript-eslint/no-explicit-any': 'off'
        }
      }
    ]
  }),
]
 
export default eslintConfig