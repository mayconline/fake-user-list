module.exports = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/**/**/*.spec.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  resolver: 'jest-ts-webcompat-resolver',
};
