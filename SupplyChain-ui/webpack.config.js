const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point for the application
  output: {
    filename: 'bundle.js', // Output bundle filename
    path: path.resolve(__dirname, 'dist'), // Output directory
    publicPath: '/', // Ensures proper routing for React Router
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Automatically resolve file extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match .js and .jsx files
        exclude: /node_modules/, // Exclude dependencies
        use: {
          loader: 'babel-loader', // Transpile JavaScript and JSX
        },
      },
      {
        test: /\.css$/, // Match CSS files
        use: ['style-loader', 'css-loader'], // Load and inject CSS
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpe?g|gif)$/, // Match font and image files
        type: 'asset/resource', // Handle assets as separate files
        generator: {
          filename: 'assets/[name].[hash][ext]', // Output path and filename for assets
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'), // Serve static files
    },
    historyApiFallback: true, // Enables routing with React Router
    compress: true, // Enable gzip compression
    port: 8080, // Set the development server port
    hot: true, // Enable hot module replacement
  },
  devtool: 'source-map', // Generate source maps for easier debugging
};
