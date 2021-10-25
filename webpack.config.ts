/* eslint-disable node/no-unpublished-require */
/* eslint-disable node/no-unpublished-import */
import {Configuration} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dotenv from 'dotenv-override-true';
import {DefinePlugin} from 'webpack';
import path from 'path';

const config: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RingCentral Extensible Performance Troubleshooting',
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
  ],
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
    },
  },
};

export default config;
