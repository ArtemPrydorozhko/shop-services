const slsw = require("serverless-webpack");
const path = require("path");

module.exports = {
  entry: slsw.lib.entries,
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  target: "node",
  externals: [
    /aws-sdk/, // Available on AWS Lambda
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
