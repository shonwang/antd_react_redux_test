var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
// var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const DEBUG = !process.argv.includes('--verbose');

console.log("is develop: ", DEBUG)

module.exports = {
    entry: {
        main: './src/js/index.jsx'
    },
    output: {
        filename: '[id].[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {modules: false}]],
                    plugins: ['syntax-dynamic-import']
                }
            }]
        },{
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {modules: false}], "react"],
                    plugins: ['syntax-dynamic-import', ["import", { "libraryName": "antd"}]]
                }
            }]
        },{
            test: /\.css$/,
            exclude: /(node_modules)/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        }]
    },
    resolve:{
        modules: [
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'src')
        ],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        // alias:{
        //     "util": path.join(__dirname,'src','core','utility')
        // },
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions:['.jsx', '.js', '.json', '.less','.css','.scss']
    },
    plugins: [
        new CleanWebpackPlugin(
            ['dist/*'],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        ),
        ...(!DEBUG ? [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ] : []),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
               // 该配置假定你引入的 vendor 存在于 node_modules 目录中
               return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin('antd.[hash].css'),
        ...(!DEBUG ? [
            new webpack.optimize.UglifyJsPlugin({
              compress: {
                screw_ie8: true,
                warnings: false,
              }
            })
        ] : []),
        //new ManifestPlugin(),
        // new ChunkManifestPlugin({
        //     filename: "chunk-manifest.json",
        //     manifestVariable: "webpackManifest",
        //     inlineManifest: false
        // })
    ]
};