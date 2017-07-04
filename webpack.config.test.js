var path = require('path');
var webpack = require('webpack');
var AssetsPlugin =  require('assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};

if (global.Promise == null) {  //for css-loader
    global.Promise = require('es6-promise').Promise;
}

module.exports = {
    devtool: "source-map",
    entry: './src/routes.js',
    output: {
        path: path.resolve(__dirname, './build/public'),
        filename: DEBUG ? 'bundle.js?[hash]' : 'bundle.[hash].js',
        //publicPath:  ''   //资源根路径的配置
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-1','react']
                }

            },
            {
                test: /\.less$/,
                include: /(src)/,
                loader: "style!css!less?sourceMap"
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]'
            },
          {
            test: /\.jsx?$/,
            include: [
              path.resolve(__dirname, './node_modules/react-routing/src'),
              path.resolve(__dirname, './src'),
            ],
            loader: 'babel-loader',
          }, {
            test: /\.scss$/,
            loaders: [
              'isomorphic-style-loader',
              `css-loader?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=` +
              `${DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}`,
              'postcss-loader?parser=postcss-scss',
            ],
          }, {
            test: /\.json$/,
            loader: 'json-loader',
          }
        ]
    },
    resolve:{
        //查找module的话从这里开始查找
        root: __dirname,
        modulesDirectories: [
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'src')
        ],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias:{
            "util": path.join(__dirname,'src','core','utility')
        },
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions:['', '.js', '.json', '.less','.css','.scss']
    },
    externals: {    // 指定采用外部 CDN 依赖的资源，不被webpack打包
        // jquery: "jQuery",// require("jquery") 是引用自外部模块的, 对应全局变量 jQuery
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      //new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': true }),
      new AssetsPlugin({
        path: path.join(__dirname, './build'),
        filename: 'assets.json',
        processOutput: x => `module.exports = ${JSON.stringify(x)};`,
      }),
      new HtmlWebpackPlugin({
        title: "金山云魔方控制台",
        template: "src/index.ejs"

      }),
      ...(!DEBUG ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            screw_ie8: true,

            // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
            warnings: VERBOSE,
          },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
      ] : []),
    ],
    stats: {
      colors: true,
      reasons: DEBUG,
      hash: VERBOSE,
      version: VERBOSE,
      timings: true,
      chunks: VERBOSE,
      chunkModules: VERBOSE,
      cached: VERBOSE,
      cachedAssets: VERBOSE,
    }
};