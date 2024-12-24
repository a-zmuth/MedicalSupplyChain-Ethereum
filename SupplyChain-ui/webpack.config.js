const path = require('path');

module.exports = {
  entry: './src/index.js', 
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
    publicPath: '/', 
  },
  resolve: {
    extensions: ['.js', '.jsx'], 
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
        test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpe?g|gif)$/, 
        type: 'asset/resource', 
        generator: {
          filename: 'assets/[name].[hash][ext]', 
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'), 
    },
    historyApiFallback: true, 
    compress: true, 
    open: true,
    port: 3000, 
    hot: true,   },

  devtool: 'source-map', // Generate source maps for easier debugging
};