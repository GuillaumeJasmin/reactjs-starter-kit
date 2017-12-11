const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
const vars = require('./src/vars.json');

const isProd = process.env.NODE_ENV === 'production';
const buildDir = path.resolve(__dirname, 'build');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

const envPlugin = new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  },
});

const cssLocalIdentName = isProd
  ? '[path]___[name]__[local]___[hash:base64:5]'
  : '[path]___[name]__[local]';

const config = {
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
  },
  entry: './src/index.js',
  output: {
    path: buildDir,
    filename: 'app.bundle.js',
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin('styles.css'),
    envPlugin,
  ],
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract([
          `css-loader?modules&importLoaders=1&localIdentName=${cssLocalIdentName}`,
        ]),
      },
      {
        test: /\.css$/,
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            autoprefixer,
            customProperties({
              preserve: !isProd,
              variables: vars.styles,
              appendVariables: true,
            }),
          ],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};

module.exports = config;
