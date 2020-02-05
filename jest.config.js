module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/", "src/index.ts"],
  collectCoverageFrom: ["**/*.ts"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
