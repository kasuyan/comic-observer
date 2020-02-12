const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  plugins: [
    new GenerateSW({
      swDest: "sw.js",
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp("https://iss.ndl.go.jp/thumbnail/"),
          handler: "CacheFirst"
        },
        {
          urlPattern: new RegExp(".js"),
          handler: "CacheFirst"
        }
      ]
      // runtimeCaching: [
      //   {
      //     urlPattern: /^https:\/\/iss\.ndl\.go\.jp\/thumbnail\/[0-9]+$/,
      //     handler: "CacheFirst",
      //     options: {
      //       cacheName: "images",
      //       cacheExpiration: {
      //         maxAgeSeconds: 60 * 60 * 24
      //       }
      //     }
      //   }
      // ]
    })
  ]
};
