const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 9527

const name = 'zhang yi'
module.exports = {
  devServer:{
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:6789/'
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
}