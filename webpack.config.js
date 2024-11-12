const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // Entry point: The main file to start bundling
  entry: './src/index.js', // Change the path as per your project structure

  // Output: Where to bundle the files
  output: {
    filename: 'bundle.js', // Name of the output file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },

  mode: 'production',

  optimization: {
    minimize: true, // Enable minification
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Optionally remove console logs in production
          },
        },
      }), // <-- Fixed the misplaced closing parenthesis
    ],
  },

  // Module: Rules for processing different types of files (e.g., JS, CSS)
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // Add this rule for CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/, // Add this rule for SVG files
        use: 'file-loader',
      }
    ]
  },

  // Plugins: Add any additional plugins here
  plugins: [],
};
