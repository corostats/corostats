import { terser } from 'rollup-plugin-terser';
import nodeResolve from 'rollup-plugin-node-resolve';

export default (commandLineArgs) => {
	return {
		input: './resources/main.js',
		output: {
			file: './assets/main.min.js',
			format: 'esm',
			plugins: commandLineArgs.configCompress ? [terser()] : []
		},
		plugins: [nodeResolve()]
	}
};
