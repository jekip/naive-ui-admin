/** @type {import('stylelint').Config} */
module.exports = {
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard'],
  // stylelint 16+ 不再内置 HTML/Less 解析能力，需要显式指定 customSyntax
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        // Vue SFC 的 v-bind(getCardColor) 会被 value-keyword-case 改写成小写，导致变量失效
        'value-keyword-case': null,
      },
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
        ],
      },
    ],
    'no-empty-source': null,
    'named-grid-areas-no-invalid': null,
    // Less 嵌套中允许声明出现在嵌套规则之后，该规则对 Less 有误报
    'no-invalid-position-declaration': null,
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    'custom-property-pattern': null,
    'function-no-unknown': null,
    // Vue SFC 的 v-bind() CSS 变量会被误判为未知值
    'declaration-property-value-no-unknown': null,
    'media-feature-range-notation': null,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports',
        },
        {
          type: 'at-rule',
          name: 'media',
        },
        'rules',
      ],
      { severity: 'warning' },
    ],
  },
};
