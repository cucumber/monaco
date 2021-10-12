const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './dist/cjs/try/index.js',
  resolve: {
    extensions: ['.js']
  },
  output: {
    globalObject: 'self',
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: []
    })
  ]
}
