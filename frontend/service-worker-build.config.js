import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/service-worker.js',
  output: {
    file: 'dist/service-worker.js',
    format: 'esm',
  },
  plugins: [nodeResolve()],
}
