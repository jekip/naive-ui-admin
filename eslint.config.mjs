// @ts-check
import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import * as parserTypeScript from '@typescript-eslint/parser';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-*/**',
      '**/node_modules/**',
      '**/public/**',
      '**/*.d.ts',
      'components.d.ts',
    ],
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    // 支持 `<script lang="tsx">` 的 SFC（如 redirect 页面）
    name: 'app/vue-tsx-parser',
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: {
          ts: parserTypeScript,
          tsx: parserTypeScript,
        },
        ecmaFeatures: { jsx: true },
      },
    },
  },
  {
    name: 'app/custom-rules',
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/custom-event-name-casing': 'off',
      'vue/require-default-prop': 'off',
      'vue/attributes-order': 'off',
      'vue/one-component-per-file': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      // 项目大量使用 `xxx && (yyy = zzz)` 的短路写法，这里不做限制
      '@typescript-eslint/no-unused-expressions': 'off',
      // 部分 SFC 的 <script> 未声明 lang，交给开发者自行决定
      'vue/block-lang': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
          ignoreRestSiblings: true,
          caughtErrors: 'none',
          // SFC <style> 里的 v-bind(getXxx) 不会被 ESLint 识别为引用
          varsIgnorePattern: '^(getTableHeaderColor|getCardColor|getBaseColor|getAppTheme)$',
        },
      ],
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
    },
  },
  eslintConfigPrettier
);
