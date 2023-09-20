const path = require('path');

module.exports = {
    entry: './assets/index.js',
    output: {
        filename: 'index-bundle.js',
        path: path.resolve(__dirname, './static')
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        devtools: 'source-map',
        port: 3000,
        compress: true,
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env", 
                        ["@babel/preset-react", {"runtime": "automatic"}]
                    ]
                }
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif)$/i,
                exclude: /node_modules/,
                type: 'asset/resource'
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};