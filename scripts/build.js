const rollup = require('rollup');
const babel = require('rollup-plugin-babel');

const rollupOptions = {
  input: 'src/index.js',
  file: 'dist/qrcanvas-react.js',
  format: 'cjs',
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

rollup.rollup(rollupOptions)
.then(bundle => bundle.write(rollupOptions))
.catch(err => console.error(err));
