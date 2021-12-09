import resolve from '@rollup/plugin-node-resolve';
//import { terser } from 'rollup-plugin-terser';

export default {
  input: './components/rooms-grid.js',
  output: [
    {
      dir: './out',
      format: 'iife',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    // for minification
    //terser(),
  ],
};
