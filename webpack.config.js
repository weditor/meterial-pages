const path = require('path');

module.exports = {
  entry: './src/App.tsx',
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
  }
};

