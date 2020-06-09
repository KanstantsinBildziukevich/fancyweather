const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        app: './src/app/script.js'
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }]
    },
    devServer: {
        overlay: true
    }
};
