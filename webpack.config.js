const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const customProperties = require('postcss-custom-properties');
const vars = require('./src/config.json');

const NODE_ENV = process.env.NODE_ENV || 'production';
const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;

/**
 *_________________________________________________________________________________
 *
 *                              Webpack plugins
 *_________________________________________________________________________________
 */
const plugins = [];

// Inject script into index.html
plugins.push(new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
}));


// NODE_ENV
plugins.push(new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(NODE_ENV),
  },
}));

// inject style.css into index.html
plugins.push(new ExtractTextPlugin('styles.[hash].css'));

/* _________________________________________________________________________________ */

const cssLocalIdentName = !isDevServer
  ? '[path]___[name]__[local]___[hash:base64:5]'
  : '[path]___[name]__[local]';

const config = {
  mode: NODE_ENV,
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
  },
  plugins,
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, 'src')],
      },
      {
        // This make possible to import the css from a node_modules package.
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(['css-loader?importLoaders=1']),
        include: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract([
          `css-loader?modules&importLoaders=1&localIdentName=${cssLocalIdentName}`,
        ]),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'postcss-loader',
        exclude: /node_modules/,
        options: {
          plugins: () => [
            autoprefixer,
            postcssNested,
            customProperties({
              variables: vars.styles,
              appendVariables: true,
            }),
          ],
        },
      },
    ],
  },
};

module.exports = config;
