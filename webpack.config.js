var path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/web/index.js',
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties"
            ],
            presets: [
              "@babel/preset-env", 
              "@babel/preset-react",
              "@babel/preset-typescript"
            ]
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        enforce: 'pre',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'src/html'),
    compress: true,
    hot: true,
    port: 9000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:9001',
    }
  }
};