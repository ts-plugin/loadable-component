const { join } = require('path')

const LoadablePlugin = require('@loadable/webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**@type {import('webpack').Configuration} */
const configuration = {
  entry: join(__dirname, 'src', 'index.tsx'),
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  target: 'web',
  devtool: 'hidden-nosources-source-map',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    parser: {
      javascript: {
        commonjsMagicComments: true,
      },
    },
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'ts-loader',
          /** @type {import('ts-loader').Options} */
          options: {
            happyPackMode: true,
            compilerOptions: {
              module: 'esnext',
            },
            getCustomTransformers: join(__dirname, 'ts-transformers.js'),
          },
        },
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'index.html'),
    }),
    new LoadablePlugin({
      filename: './stats.json',
      writeToDisk: true,
    }),
  ],
}

module.exports = configuration
