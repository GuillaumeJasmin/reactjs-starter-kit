module.exports = {
  cacheDirectory: './node_modules/.cache/jest', // avoid to create jest_0 folder
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
  roots: ['./src'],
  setupTestFrameworkScriptFile: '<rootDir>tests//setupTests.js',
};

