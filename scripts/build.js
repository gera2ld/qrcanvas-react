const rollup = require('rollup');
const babel = require('rollup-plugin-babel');

const rollupOptions = {
  plugins: [
    babel({
      presets: [
        ['env', {
          modules: false,
        }],
        'stage-2',
        'react',
      ],
      plugins: [
        'external-helpers',
      ],
      ignore: 'node_modules/**',
    }),
  ],
  external: [
    'react',
    'react-dom',
    'qrcanvas',
  ],
};

rollup.rollup(Object.assign({
  input: 'src/index.js',
}, rollupOptions))
.then(bundle => bundle.write({
  file: 'dist/qrcanvas-react.js',
  format: 'cjs',
}))
.catch(err => console.error(err));
