const path = require("path");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    filename: "equilibrium.js",
    path: path.resolve(__dirname, "dist/js"),
  },
  mode: "production",
};
