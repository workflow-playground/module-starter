module.exports = {
  rootDir: './',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  }
};
