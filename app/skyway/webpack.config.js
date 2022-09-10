const path = require("path");
const loadenv = require("node-env-file");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function getENV() {
  const API_KEY = loadenv("../../.env");
  return {
    API_KEY,
  };
}

module.exports.API = (env, argv) => {
  const htmlTemplate = path.join("../home/index.pug");
  const ENV = getENV();
  return {
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: {
            loader: "pug-loader",
            options: {
              self: true,
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: htmlTemplate,
        data: ENV,
      }),
    ],
  };
};
