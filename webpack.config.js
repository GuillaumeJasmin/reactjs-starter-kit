const Webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const customProperties = require('postcss-custom-properties');
const vars = require('./src/config.json');

const envs = {};
fs.readdirSync('./env')
  .filter(env => env.endsWith('.json'))
  .forEach((filename) => {
    const content = JSON.parse(fs.readFileSync(`./env/${filename}`));
    const envName = filename.replace('.json', '');
    envs[envName] = content;
  });

const isProd = process.env.NODE_ENV === 'production';
const buildDir = path.resolve(__dirname, 'build');

const now = new Date().toISOString();
const suffixFiles = `?t=${now}`;

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

const envPlugin = new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    CLIENT_ENVS: JSON.stringify(envs),
    FORCE_CLIENT_ENV: JSON.stringify(process.env.FORCE_CLIENT_ENV),
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
    filename: `bundle.js${suffixFiles}`,
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin(`styles.css${suffixFiles}`),
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
        include: /src/,
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
