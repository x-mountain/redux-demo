var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//path config
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  entry: './index.jsx',
  output: {
    path: BUILD_PATH,
    //publicPath:'/test/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders:[
      {test: /\.less$/,loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader")},
      { test: /\.(png|jpe?g)$/,loader: 'url-loader?limit=8192&name=images/[name].[ext]'},
      //{test: /\.css|less$/,loader: "file?name=css/[name].[ext]"},
      {test: /\.(eot|svg|ttf|woff2?)$/,loader: "url-loader?name=fonts/[name].[ext]"},
      //{ test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader' },
      { test: /\.(js|jsx)$/, exclude:/node_modules/, loader: 'babel-loader'},
    ]
  },
  plugins: [
    new CommonsChunkPlugin('init.js'),
    new ExtractTextPlugin("[name].css"),
    //new ExtractTextPlugin("app.css", {allChunks: true}),
    new OpenBrowserPlugin({ url: 'http://localhost:8050/devTest/index.html'})
  ],
  devServer: {
    historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port:8050
  },
};
