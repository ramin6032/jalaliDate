import type { Config } from "@jest/types";

declare module "@jest/types" {
  interface Config {
    preset?: string;
    testEnvironment?: string;
    testMatch?: string[];
    moduleFileExtensions?: string[];
    collectCoverage?: boolean;
    coverageDirectory?: string;
    coverageReporters?: string[];
    coverageThreshold?: {
      global: {
        branches: number;
        functions: number;
        lines: number;
        statements: number;
      };
    };
    setupFilesAfterEnv?: string[];
    moduleNameMapper?: {
      [key: string]: string;
    };
    transform?: {
      [key: string]: string;
    };
    globals?: {
      "ts-jest": {
        tsconfig: string;
      };
    };
    verbose?: boolean;
    testTimeout?: number;
    maxWorkers?: number | string;
    bail?: boolean | number;
    testPathIgnorePatterns?: string[];
    testPathPattern?: string;
    testRegex?: string | string[];
    testSequencer?: string;
    transformIgnorePatterns?: string[];
    unmockedModulePathPatterns?: string[];
    watchPathIgnorePatterns?: string[];
  }
}
