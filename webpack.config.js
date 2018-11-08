const path = require('path');

const api_host = "http://localhost:8000";

module.exports = {
    entry: './src/index.jsx',
    mode: "development",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ["babel-loader", "ts-loader"]
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            },
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        historyApiFallback: {
            index: "index.html"
        },

        proxy: {
            "/api_auth/*": api_host,
            "/account/*": api_host,
            "/api/*": api_host,
        }
    }
};
