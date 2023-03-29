const path = require('path');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (_env, _argv) => {
  return {
    target: 'node',
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({ extractComments: false })],
    },
    mode: 'production',
    entry: {
      'delete-headshots-s3': './src/entry/delete-headshots-aws',
      'generate-imgs-json': './src/entry/generate-json.ts',
      'upload-imgs-aws': './src/entry/upload-to-aws.ts',
      'write-imgs-to-disk': './src/entry/write-to-disk.ts',
      'write-values-to-sheet': './src/entry/write-to-sheet.ts',
    },
    externals: {
      sharp: 'commonjs sharp',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [['@babel/preset-env', { targets: 'defaults' }]],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          include: /images/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
      fallback: {
        '@aws-sdk/signature-v4-crt': require.resolve('@aws-sdk/signature-v4-crt'),
        'aws-crt': require.resolve('aws-crt'),
        request: require.resolve('request'),
      },
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: (pathData) => `[name].js`,
    },
    plugins: [new Dotenv()],
  };
};
