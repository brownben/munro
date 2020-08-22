module.exports = {
  extends: [
    'alloy',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],

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

    'no-promise-executor-return': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/html-indent': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
