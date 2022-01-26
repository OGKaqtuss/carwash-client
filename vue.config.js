module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5094',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
