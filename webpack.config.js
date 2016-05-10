var path = require('path'),
    HtmlwebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    merge = require('webpack-merge'),
    webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event,
    PATHS = {
        app: path.join(__dirname, 'app'),
        build: path.join(__dirname, 'dist'),
        tests: path.join(__dirname, 'tests')
    };

process.env.BABEL_ENV = TARGET;

const common = {
    entry: PATHS.app,
    resolve: {
        alias: {
            actions: path.resolve(__dirname, 'app', 'actions'),
            stores: path.resolve(__dirname, 'app', 'stores'),
            components: path.resolve(__dirname, 'app', 'components'),
            libs: path.resolve(__dirname, 'app', 'libs'),
            notifications: path.resolve(__dirname, 'app', 'components', 'notifications'),
            controls: path.resolve(__dirname, 'app', 'components', 'controls'),
            auth: path.resolve(__dirname, 'app', 'components', 'auth'),
            activity: path.resolve(__dirname, 'app', 'components', 'activity'),
            styles: path.resolve(__dirname, 'app', 'styles')
        },
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: '/[name].bundle.js',
        chunkFilename: "/[id].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'less'].join('!'))
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', "css-loader")
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(eot|svg|ttf|jpg|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel?plugins[]=add-module-exports'],
                include: [PATHS.app, PATHS.tests]
            }
        ]
    },
    plugins: [
        //This plugin makes a module available as variable in every module. The module is required only if you use the variable.
        //Example: Make $ and jQuery available in every module without writing require("jquery").
        new webpack.ProvidePlugin({"React": "react"}),
        new HtmlwebpackPlugin({
            template: 'node_modules/html-webpack-template/index.html',
            title: 'BeyondPod Web',
            appMountId: 'app'
        }),
        //https://github.com/webpack/extract-text-webpack-plugin
        new ExtractTextPlugin('/[name].css', {disable:(TARGET === 'start')})
    ]
};

//each target:

if (TARGET === 'start') {
    console.log("Running Start Target");
    module.exports = merge(common, {
        output: {
            path: PATHS.build,
            publicPath: 'http://localhost:8080/',
            filename: '/bundle.js'
        },
        devtool: 'inline-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // display only errors to reduce the amount of output
            stats: 'errors-only',

            // parse host and port from env so this is easy
            // to customize
            host: process.env.HOST,
            port: process.env.PORT,
            proxy: {
                '/api*': {
                    target: 'http://localhost:8081', //can point this to aws if needed
                    secure: false
                }
            }
        }
        ,
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

//BUILD
if (TARGET === 'build' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'source-map',
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                'process.env': {'NODE_ENV': JSON.stringify('production')}
            })
        ]
    });
}

//TEST
if (TARGET === 'test' || TARGET == 'tdd') {
    module.exports = {
        resolve: common.resolve,
        devtool: 'inline-source-map',
        module: common.module,
        plugins: [
            new ExtractTextPlugin('/[name].css', {disabled: true})
        ]
    };
}
