const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const loadenv = require("node-env-file");

function getENV() {
  //   const { API_KEY } = loadenv("../../.env");
  const API_KEY = process.env.API_KEY;
  return {
    API_KEY,
  };
}

module.exports = (env, argv) => {
  const htmlTemplate = path.join("./src/index.pug");
  const ENV = getENV();
  return {
    // 略
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
      new HtmlWebpackPlugin({
        template: htmlTemplate,
        data: ENV,
      }),
    ],
  };
};
