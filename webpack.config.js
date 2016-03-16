const webpack = require('webpack')
const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const ROOT_PATH = path.resolve(__dirname)


module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map',
  entry: [
    path.resolve(ROOT_PATH,'src/index.js') //./website/index.js
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    },
    // { test: /\.json$/, loader: 'json' },
    {
      test: /\.css$/,
      loader: 'style!css'
    },
    {
      test: /\.scss$/,
      loaders: ['style','css','sass']
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: process.env.NODE_ENV === 'production' ? path.resolve(ROOT_PATH, 'dist') : path.resolve(ROOT_PATH, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'build'),
    historyApiFallback: true,
    hot: true,
    host: '127.0.0.1',
    port: 4002,
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlwebpackPlugin({
      title: 'binocular',
      template: 'custom-index.ejs', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    })
  ]
}