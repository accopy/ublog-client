
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
