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

  // include if you do not want a separate css file
  css: { extract: false },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
      silentFallbackWarn: true,
      silentTranslationWarn: true
    }
  }
};
