const webpack = require('webpack');
const path = require('path');

/* Configure HTMLWebpack plugin */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'head'
})

/* Configure ProgressBar */
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ProgressBarPluginConfig = new ProgressBarPlugin()

/* Export configuration */
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: [
        './src/index.ts'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
            }, {
                test: /\.css$/,
                exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                        }
                    }
                ]
            }, {
        			test: /\.(glsl|vs|fs)$/,
        			loader: 'shader-loader',
        			options: {
        			  glsl: {
        			    chunkPath: path.resolve("/glsl/chunks")
        			  }
        			}
            }
        ]
    },
    resolve: { extensions: [".web.ts", ".web.js", ".ts", ".tsx", ".js", ".css"] },
    plugins: [HTMLWebpackPluginConfig, ProgressBarPluginConfig]
}
