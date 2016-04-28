var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var isProduction = function() {
  return process.env.NODE_ENV === 'production';
};
//webpack插件
var plugins = [
  //提公用js到common.js文件中
  new webpack.optimize.CommonsChunkPlugin('common.js'),
  //将样式统一发布到style.css中
  new ExtractTextPlugin("style.css", {
    allChunks: true,
    disable: false
  }),
  // 使用 ProvidePlugin 加载使用率高的依赖库
  new webpack.ProvidePlugin({
    $: 'webpack-zepto'
  })
];
//path config
var entry = ['./index.jsx'],
    cdnPrefix = "",
    buildPath = "/build/",
    publishPath = cdnPrefix + buildPath;

//生产环境js压缩和图片cdn
if (isProduction()) {
  //plugins.push(new webpack.optimize.UglifyJsPlugin());
  cdnPrefix = "";
  publishPath = cdnPrefix;
}

module.exports = {
  entry: entry,
  output: {
    path: __dirname + buildPath,
    publicPath:publishPath,
    filename: 'bundle.js',
    chunkFilename:"[id].bundle.js?[chunkhash]"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders:[
      {test: /\.less$/,loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader")},
      { test: /\.(png|jpe?g)$/,loader: 'url-loader?limit=8192&name=images/[name].[ext]'},
      //{test: /\.css|less$/,loader: "file?name=css/[name].[ext]"},
      {test: /\.(eot|svg|ttf|woff2?)$/,loader: "url-loader?name=fonts/[name].[ext]"},
      //{ test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader' },
      { test: /\.(js|jsx)$/, exclude:/node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: plugins,
  /*[
   new CommonsChunkPlugin('init.js'),
   new ExtractTextPlugin("[name].css"),
   //new ExtractTextPlugin("app.css", {allChunks: true}),
   new OpenBrowserPlugin({ url: 'http://localhost:8050/devTest/index.html'})
   ]*/
  /*devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port:8050
  }*/
    devtool: '#source-map'
};
