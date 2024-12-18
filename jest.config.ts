import type {Config} from "jest"
import nextJest from "next/jest"
import {pathsToModuleNameMapper} from "ts-jest"
import {compilerOptions} from "./tsconfig.json"

const createJestConfig = nextJest({
  dir: "./",
})

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: "<rootDir>/"}),

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
}

export default createJestConfig(config)
