import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'docs'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // axe-core's scrollable-region-focusable rule requires
      // tabIndex={0} on a horizontally-scrollable role="region" (the
      // benchmark table, the repo-tree code block) so keyboard users
      // can actually reach and scroll it. jsx-a11y's default role
      // allowlist for this doesn't include "region" even though WCAG
      // 2.1.1 requires exactly this pattern — allow it explicitly.
      'jsx-a11y/no-noninteractive-tabindex': ['error', { roles: ['region'] }],
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
  }
);
