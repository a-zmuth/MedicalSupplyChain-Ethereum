const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        loader: 'json-loader',
      },  
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_API': JSON.stringify(process.env.REACT_APP_API || 'http://localhost:8080'),
      'process.env.REACT_API_KEY': JSON.stringify(process.env.REACT_API_KEY || 'key'),
      'process.env.REACT_APP_ADDRESS': JSON.stringify(process.env.REACT_APP_ADDRESS || '0x7106A6d32a30eA41D25A1d5dcC03d08F70bA4B99'),
      'process.env.REACT_APP_RPC_URL': JSON.stringify(process.env.REACT_APP_RPC_URL || 'http://127.0.0.1:7545'),
    }),
  ],
};