const webpack = require("webpack");
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },
  chainWebpack: config => {
    config.optimization.delete("splitChunks");
  },
  filenameHashing: false,
  css: { extract: false } // include if you do not want a separate css file
};