const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const customProperties = require('postcss-custom-properties');
const vars = require('./src/config.json');
// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';
const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;
const now = new Date().toISOString();
const suffixFiles = `?t=${now}`;

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


// env.js. Incomment the next line to activate it
// plugins.push(new HtmlWebpackIncludeAssetsPlugin({ assets: ['env.js'], append: false }));


// NODE_ENV
plugins.push(new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(NODE_ENV),
  },
}));

// inject style.css into index.html
plugins.push(new ExtractTextPlugin(`styles.css${suffixFiles}`));

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
    filename: `bundle.js${suffixFiles}`,
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
        exclude: /node_modules/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        include: /src/,
        options: {
          // turn eslint warning into error outside local environment
          failOnWarning: !isDevServer,
        },
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
