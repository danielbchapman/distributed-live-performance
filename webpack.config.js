var path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/web/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'src/html'),
    compress: true,
    hot: true,
    port: 9000,
    historyApiFallback: true
  }
};