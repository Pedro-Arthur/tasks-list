module.exports = {
  testMatch: [
    '<rootDir>/tests/unit/**/*.spec.js',
    '<rootDir>/tests/integration/**/*.spec.js'
  ],
  moduleFileExtensions: [
    "js",
    "json",
    "vue"
  ],
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./tests/setup.js'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/mdi-vue/v2/',
    '/node_modules/@mdi/js/',
  ],
}
