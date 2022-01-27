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
      },
      '/ws': {
        target: 'http://localhost:15674',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
