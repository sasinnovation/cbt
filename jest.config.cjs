module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.ts",
    "<rootDir>/tests/setup/resetState.ts"
  ],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};
