module.exports = {
  verbose: false,
  testURL: 'http://localhost/',
  browser: true,

  modulePaths: ['<rootDir>'],

  moduleFileExtensions: ['js', 'json', 'vue', 'jsx'],

  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },

  setupFiles: ['jest-localstorage-mock'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  snapshotSerializers: ['jest-serializer-vue'],

  collectCoverage: true,

  coverageReporters: ['html', 'text'],

  coverageDirectory: '<rootDir>/src/tests/coverage',

  transformIgnorePatterns: ['/node_modules/'],

  testMatch: ['**/*.test.js'],

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
