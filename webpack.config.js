var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './app.js'
    ],
    output: {
        path: __dirname,
        filename: "dist/bundle.js",
    },
    resolve: {
        root: [
            path.resolve('./scripts')
        ]
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },

            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devServer: {
      hot: true,
      contentBase: './'
    }
};
