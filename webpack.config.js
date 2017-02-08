

let HtmlWebpackPlugin = require('html-webpack-plugin')
let resolveRelativePath = (path) => require('path').resolve(__dirname, path);

module.exports = {

  // the entry point for the webpack dependency analysis
  entry: './app.client/index.tsx',

  // the output bundle(s)
  output: {
    path: resolveRelativePath('built/app.client'),
    filename: '[name].[hash].js'
  },

  // how will different types of modules be processed ("loaded")
  module: {
    rules: [
      // https://webpack.js.org/guides/webpack-and-typescript/#typescript-loaders
      // enforce: 'pre' runs this loader before any other loaders
      { enforce: 'pre', test: /\.tsx?$/, use: 'source-map-loader' },
      { test: /\.tsx?$/, use: 'ts-loader', exclude: '/node_modules/' },
      { test: /\.css$/, use: 'css-loader' },
    ]
  },

  // tell webpack to use .tsx files
  resolve: { extensions: [".tsx", ".ts", ".js"] },

   // again, this is needed for typescript source maps
  // https://webpack.js.org/guides/webpack-and-typescript/#typescript-loaders
  devtool: 'inline-source-map',

  // plugins are for anything "loaders" can't do
  plugins: [
    // generate the index.html page (using the actual index.html as the input)
    // with all the things that we need (use defaults)
    new HtmlWebpackPlugin({
      template: './app.client/index.html'
    })
  ],

  // configure webpack-dev-server - open a browser window (the default port 8080)
  // proxy all requests to the backend nodejs server running on port 5000
  devServer: { open: true, quiet: true, proxy: { '*': 'http://localhost:5000' } }

};
