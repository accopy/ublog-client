const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  transpileDependencies: true,
  lintOnSave: false, //去除eslint
  devServer: {
    client: {
      overlay: false,
    },
    proxy: {
      '/upload': {
        target: 'https://sm.ms/api/v2/upload', //这里填入你要请求的接口的前缀
        // ws:true,//代理websocked
        changeOrigin: true, //虚拟的站点需要更管origin
        secure: true, //是否https接口
        pathRewrite: {
          '^/upload': '', //重写路径
        },
      },
    },
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import '/src/assets/style/mixin.scss';`,
      },
    },
  },
});
