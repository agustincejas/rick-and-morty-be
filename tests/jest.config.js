module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.js",
    "!**/node_modules/**"
  ],
  coverageDirectory: "./coverage",
  coverageProvider: "v8"
};
