module.exports = {
  extends: ['alloy', 'alloy/vue'],

  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },

  globals: {
    document: false,
    navigator: false,
    window: false,
    global: true,
  },

  rules: {
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],
    'default-param-last': 'error',
    'dot-notation': 'error',
    'no-console': 'warn',
    'no-lonely-if': 'error',
    'no-plusplus': 'error',
    'no-unneeded-ternary': 'error',
    'no-ternary': 'error',
    'no-useless-return': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'require-await': 'error',
    'sort-vars': 'error',
    'max-params': ['error', { max: 4 }],
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/no-duplicate-attributes': [
      'error',
      {
        allowCoexistClass: true,
        allowCoexistStyle: false,
      },
    ],
    'no-promise-executor-return': 'off',
    'vue/no-multiple-template-root': 'off',
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
}
