module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/**/**/*.spec.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  resolver: 'jest-ts-webcompat-resolver',
};
