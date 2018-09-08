const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  mode: "development",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.tsx?$/, exclude: /node_modules/, loaders: ["babel-loader", "ts-loader"] }
    ]
  },
//   devServer: {
//     host: '0.0.0.0',
//     port: 8080,
//     historyApiFallback: true,

//     hot: true,

//     proxy: {
//         "/api_auth/*": `http://localhost:8090`,
//         "/account/*": `http://localhost:8090`,
//         "/api/*": `http://localhost:8090`,
//     }
// }
};

