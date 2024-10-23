// jest.config.js

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom', // Define o ambiente de teste para jsdom
  moduleFileExtensions: ['js', 'jsx'],
  roots: ['<rootDir>/frontend'],
  testMatch: ['**/test/**/*.test.js'],
  verbose: true,
};
