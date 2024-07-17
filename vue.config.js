
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  transpileDependencies: true,
  lintOnSave: false,//去除eslint
  devServer: {
    client: {
      overlay: false,
    },
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import '/src/assets/style/mixin.scss';`,
      },
    },
  },

})
