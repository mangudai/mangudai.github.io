const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      { test: /\.ts$/, exclude: /node_modules/, use: 'ts-loader' }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new CopyWebpackPlugin([{ from: 'node_modules/monaco-editor', to: 'monaco-editor' }])
  ]
}
