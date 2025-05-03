const path = require("path");

module.exports = {
  entry: "./src/js/equilibrium.js",
  output: {
    filename: "equilibrium.js",
    path: path.resolve(__dirname, "dist/js"),
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
