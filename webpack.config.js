const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const browserConfig = {
  entry: "./src/react/browser/index.js",
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.woff$/, /\.woff2$/, /\.eot$/, /\.ttf$/, /\.ico$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, "")
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1 }
            },
            {
              loader: "postcss-loader",
              options: { plugins: [autoprefixer()] }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        // loaders: ["style-loader","css-loader", "sass-loader"]
        loaders: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          plugins: ["transform-decorators-legacy"],
          presets: ["react", "stage-2"],
        }
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin({
    //   filename: "public/css/[name].css"
    // }),
    new MiniCSSExtractPlugin({
      filename: "public/css/[name].css"
    })
  ]
};

const serverConfig = {
  entry: ["@babel/polyfill", "./src/server/index.js"],
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.woff$/, /\.woff2$/, /\.eot$/, /\.ttf$/, /\.ico$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, ""),
          emit: false
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: require.resolve('css-loader')
          }
        ]
      },
      {
        test: /\.scss$/,
        loaders: ["raw-loader"]
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        // use: {
        // 	loader: 'babel-loader',
        // },
        query: {
          plugins: ["transform-decorators-legacy"],
          presets: ["react", "es2015", "stage-2"],
          compact: false
        },
        // plugins: ["@babel/plugin-proposal-object-rest-spread"]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = false;",
      raw: true,
      include: /\.js$/
    })
  ]
};

module.exports = [browserConfig, serverConfig];
