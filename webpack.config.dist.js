var webpack = require('webpack');
const path = require('path')

module.exports = {
  devtool: 'sourcemap',
  entry: [
    './src/components/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'binocular.js',
    sourceMapFilename: 'binocular.map',
    library: 'binocular',
    libraryTarget: 'umd'
  },
  plugins: [
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules&importLoaders=1', 'cssnext'],
        exclude: path.join(__dirname, 'node_modules')
      },
      {
        test: /\.scss$/,
        loaders: ['style','css','sass']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }
}