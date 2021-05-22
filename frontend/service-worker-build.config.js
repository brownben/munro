import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import workbox from 'rollup-plugin-workbox-inject'

export default {
  input: 'src/service-worker.js',
  output: {
    file: 'dist/service-worker.js',
    format: 'esm',
  },
  plugins: [
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    workbox({
      globDirectory: 'dist',
      globPatterns: ['*.html'],
    }),
    terser(),
  ],
}
