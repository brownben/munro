module.exports = {
  ignorePatterns: [
    '**/*.md',
    '**/*.woff2',
    '**/*.avif',
    '**/*.toml',
    '**/*.json',
    'nuxt.d.ts',
    '.nuxt/**',
    '.output/**',
    'node_modules/**',
    'public/**',
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-setup-props-destructure': 'off',
  },
}
