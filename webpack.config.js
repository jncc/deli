"use strict"

let webpack = require('webpack');
let NoOpWebpackPlugin = require('noop-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let GitRevisionPlugin = require('git-revision-webpack-plugin')
let resolveRelativePath = (path) => require('path').resolve(__dirname, path);

module.exports = function(env) {

  // use custom env.name passed on command line to conditionally build for production
  // (webpack -p automatically passes sets NODE_ENV=production for the build,
  // but we don't see it here in the build script!)
  if (!env) { env = { name:'development' } };
  console.log(`Hello from the Webpack build script. Environment name is '${env.name}'.`);

  // get git revision plugin - branch determines build time config
  let grp = new GitRevisionPlugin({
    branch: true
  })

  return {
    // the entry point for the webpack dependency analysis
    entry: './app.client/index.tsx',

    // the webpacked output bundle
    output: {
      path: resolveRelativePath('built/app.client'),
      filename: '[name].[hash].js'
    },

    // how will different types of modules be processed ("loaded")?
    module: {
      rules: [
        // https://webpack.js.org/guides/webpack-and-typescript/#typescript-loaders
        { test: /\.tsx?$/, use: 'source-map-loader', enforce: 'pre' },
        { test: /\.tsx?$/, use: 'awesome-typescript-loader', exclude: '/node_modules/' },
        // https://webpack.js.org/guides/code-splitting-css/
        { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) },
        // https://webpack.js.org/loaders/less-loader/ (we import the less in index.tsx)
        { test: /\.less$/, use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        },
        // http://survivejs.com/webpack/understanding-loaders/loading-images/
        { test: /\.(jpg|png)$/, loader: 'file-loader', options: { name: '[path][name].[hash].[ext]' }},
        // markdown loader
        { test: /\.md$/, use: [ { loader: "html-loader" }, { loader: "markdown-loader", options: { /* your options here */ } } ] },
        { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
        { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" }
      ]
    },

    // tell webpack to use .tsx files
    resolve: { extensions: [".tsx", ".ts", ".js"] },

    // devtool is the tool that generates source maps
    // https://webpack.js.org/guides/webpack-and-typescript/#typescript-loaders
    devtool: env.name !== 'production' ? 'inline-source-map' : '',

    // plugins are for anything "loaders" can't do
    plugins: [
      // this is necessary for the extract-text loader... baffling!
      // https://webpack.js.org/guides/code-splitting-css/
      new ExtractTextPlugin('styles.css'),
      // copy images
      new CopyWebpackPlugin([
        { from: './app.client/images', to: 'images' }
      ]),
      // generate the index.html page (using the actual index.html as the input)
      // with all the things that we need (using plugin defaults)
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './app.client/index.ejs',
        branch: grp.branch(),
        commit: grp.commithash()
      }),

    ],

    // configure webpack-dev-server - runs on the default port 8080
    // open a browser window, quietly, and proxy all requests to the app.server
    // nodejs server running on port 5000
    devServer: { open: true, quiet: true, proxy: { '*': 'http://localhost:5000' } }
  }
};
