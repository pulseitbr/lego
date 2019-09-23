import svgr from "@svgr/rollup";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import strip from "rollup-plugin-strip";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import url from "rollup-plugin-url";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default {
	input: "src/index.ts",
	output: [
		{
			file: pkg.main,
			format: "cjs",
			exports: "named",
			sourcemap: true
		},
		{
			file: pkg.module,
			format: "es",
			exports: "named",
			sourcemap: true
		}
	],
	plugins: [
		external(),
		postcss({
			modules: true,
			minimize: true
		}),
		url({
			sourceDir: "./src"
		}),
		svgr(),
		resolve({
			browser: true
		}),
		typescript({
			rollupCommonJSResolveHack: true,
			clean: true
		}),
		babel({
			exclude: "node_modules/**"
		}),
		commonjs(),
		terser({
			mangle: true,
			compress: true,
			ie8: false,
			ecma: 5,
			module: true,
			output: {
				beautify: false,
				ecma: 5,
				ie8: false,
				max_line_len: false
			},
			parse: {
				html5_comments: false,
				shebang: false
			}
		}),
		terser(),
		strip({
			debugger: true,
			functions: ["console.log", "assert.*", "debug", "alert"],
			sourcemap: true
		})
	]
};
