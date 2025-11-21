/** @type {require('jest').Config} */
const config = {
    verbose: true,
    testEnvironment: 'node',
    testMatch: ['**/*.test.js'],
    forceExit: true,
    clearMocks: true,
   
};

module.exports = config;
