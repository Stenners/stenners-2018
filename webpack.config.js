const path = require('path');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    // devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            { test: /\.jss$/, use: 'babel-loader' }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "dist",
    }
};