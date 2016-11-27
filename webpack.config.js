var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: {
        dev: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/dev-server'
        ],
        button: './button.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].entry.js",
        publicPath: path.join(__dirname, "dist/")
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
      }),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
        })
    ],
    devServer: {
      hot: true,
      contentBase: './'
    }
};
