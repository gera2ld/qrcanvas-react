module.exports = {
  extends: require.resolve('@gera2ld/plaid/config/babelrc-base'),
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '#': './src',
      },
    }],
  ].filter(Boolean),
};
