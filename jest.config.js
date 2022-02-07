module.exports = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  testMatch: ['**/**/**/*.spec.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
