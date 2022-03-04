const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 9526

const name = 'zhang yi'
module.exports = {

  devServer: {
    port: port,
    open: true,
    // client: {
    //   progress: true,
    //   overlay: {
    //     warnings: false,
    //     errors: true
    //   },
    // },
    proxy: {
      '/api': {
        target: 'http://172.27.1.236:6789',
        // target: 'http://localhost:6789',
        changeOrigin: true
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
    },

  },
}