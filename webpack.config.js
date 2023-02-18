// Imports
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const combineLoaders = require('webpack-combine-loaders');
require("babel-register");
// Webpack Configuration
const isDevelopment = process.env.NODE_ENV === 'development';
const config = {
  // Entry
  entry: './src/index.tsx',
  
  // Output
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files/TS files
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
      // CSS Files
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:8]',
              camelCase: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      //File Loader to refer images
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: "file-loader"
      }
    ]
  },
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ],
  watch: true,
  // Development Tools (Map Errors To Source File)
  devtool: 'source-map',
};
// Exports
module.exports = config;