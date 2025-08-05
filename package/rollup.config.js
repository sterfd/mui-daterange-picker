import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';

const commonjsOptions = {
  include: 'node_modules/**',
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  external: [
    /@babel\/runtime/, 
    'react',
    'react-dom',
    '@emotion/react',
    '@emotion/styled',
    '@mui/material',
  ],
  plugins: [
    external(),
    url({ exclude: ['**/*.svg'] }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: ["@babel/plugin-transform-runtime"],
    }),
    resolve(),
    typescript({ tsconfig: '../tsconfig.json' }),
    commonjs(commonjsOptions),
  ],
};
