import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/bundle.min.js',
      format: 'iife',
			name: 'version',
			plugins: [terser()]
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist/' },
      ],
    }),
  ],
};