const rollup = require('rollup');
const { uglify } = require('rollup-plugin-uglify');
const { getRollupPlugins, getExternal, DIST } = require('./scripts/util');
const pkg = require('./package.json');

const FILENAME = 'qrcanvas-react';
const BANNER = `/*! ${pkg.name} v${pkg.version} | ${pkg.license} License */`;

const external = getExternal([
  'qrcanvas',
  'react',
]);
const rollupConfig = [
  {
    input: {
      input: 'src/index.tsx',
      plugins: getRollupPlugins(),
      external,
    },
    output: {
      format: 'cjs',
      file: `${DIST}/${FILENAME}.common.js`,
    },
  },
  {
    input: {
      input: 'src/index.tsx',
      plugins: getRollupPlugins(),
      external,
    },
    output: {
      format: 'esm',
      file: `${DIST}/${FILENAME}.esm.js`,
    },
  },
  {
    input: {
      input: 'src/index.tsx',
      plugins: getRollupPlugins({ browser: true }),
      external,
    },
    output: {
      format: 'iife',
      file: `${DIST}/${FILENAME}.js`,
      name: 'qrcanvas.react',
      globals: {
        qrcanvas: 'qrcanvas',
        react: 'React',
      },
    },
    minify: true,
  },
];
// Generate minified versions
rollupConfig.filter(({ minify }) => minify)
.forEach(config => {
  rollupConfig.push({
    input: {
      ...config.input,
      plugins: [
        ...config.input.plugins,
        uglify({
          output: {
            ...BANNER && {
              preamble: BANNER,
            },
          },
        }),
      ],
    },
    output: {
      ...config.output,
      file: config.output.file.replace(/\.js$/, '.min.js'),
    },
  });
});

rollupConfig.forEach((item) => {
  item.output = {
    indent: false,
    ...item.output,
    ...BANNER && {
      banner: BANNER,
    },
  };
});

module.exports = rollupConfig.map(({ input, output }) => ({
  ...input,
  output,
}));