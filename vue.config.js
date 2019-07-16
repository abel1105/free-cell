module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/free-cell/' : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_variables.scss";`
      }
    }
  }
};
