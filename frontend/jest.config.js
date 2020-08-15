module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  testMatch: ['**/*.{spec,test}.[jt]s?(x)'],

  collectCoverage: true,
  coverageReporters: ['html', 'text'],
  coverageDirectory: '<rootDir>/src/tests/coverage',
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/*.config.js',
    '!**/coverage/**',
    '!**/node_modules/**',
  ],
}
