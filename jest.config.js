/**  @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'index.ts',
    'app.ts',
    'routers',
    'config.ts',
    'user.ts',
    'team.ts',
    'circuit.ts',
    'drivers.ts',
    'ranking.ts',
    'schema.ts',
    'model',
    'express.server',
  ],
};
