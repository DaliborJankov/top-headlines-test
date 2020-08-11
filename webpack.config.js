const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + "/public/index.html",
  filename: "index.html",
  inject: "body",
});

const ForkTsCheckerWebpackConfig = new ForkTsCheckerWebpackPlugin({
  eslint: {
    files: "./src/**/*.{ts,tsx,js,jsx}", // required - same as command `eslint ./src/**/* --ext .ts,.tsx,.js,.jsx`
  },
});

const ReactRefreshWebpackPluginConfig = new ReactRefreshWebpackPlugin();
const DotenvConfig = new Dotenv();

// Required for babel-preset-react-app
process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  devServer: {
    compress: true,
    port: 8800,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { plugins: ["react-refresh/babel"] },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    ForkTsCheckerWebpackConfig,
    ReactRefreshWebpackPluginConfig,
    DotenvConfig,
  ],
};
