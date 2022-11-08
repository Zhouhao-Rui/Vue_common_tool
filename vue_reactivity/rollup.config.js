const commonjs = require('@rollup/plugin-commonjs')
const babel = require('rollup-plugin-babel')
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/umd/vue.js',
    format: 'umd',
    name: 'Vue',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    serve({
      open: true,
      contentBase: '',
      port: 3000,
      openPage: '/public/index.html'
    }),
    commonjs(),
    livereload()
  ]
}