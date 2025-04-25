import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");

export default [
  {
    input: "src/jalali.ts",
    output: [
      {
        file: "dist/jalali.js",
        format: "umd",
        name: "Jalali",
      },
      {
        file: "dist/jalali.esm.js",
        format: "es",
      },
      {
        file: "dist/jalali.min.js",
        format: "umd",
        name: "Jalali",
        plugins: [terser()],
      },
    ],
    plugins: [typescript(), resolve(), commonjs()],
  },
  {
    input: "dist/types/jalali.d.ts",
    output: [{ file: "dist/jalali.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
