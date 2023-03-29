module.exports = {
  presets: [['@babel/preset-typescript'], ['@babel/preset-env', { targets: { node: 'current' } }]],
  plugins: ['@babel/plugin-syntax-throw-expressions'],
};
