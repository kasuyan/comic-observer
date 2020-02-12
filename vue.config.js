const configureWebpack = require("./webpack.config.js");

module.exports = {
  publicPath: process.env.VUE_APP_ASSETS_PATH,
  configureWebpack
};
