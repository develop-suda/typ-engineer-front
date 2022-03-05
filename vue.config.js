module.exports = {
  devServer: {
    proxy: {
      'http://localhost:8080': {
        target: 'http://localhost:8888',
        timeout: 6000,
        secure: false,
        changeOrigin: true
      }
    }
  }
}
