const { join } = require('path')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  ...require('./webpack.config'),
  entry: join(__dirname, 'src', 'index.server.tsx'),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: join(__dirname, 'dist'),
    filename: 'server.js',
  },
  plugins: [],
}
