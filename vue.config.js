const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 9526

// const name = 'zhang yi'
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0]['title'] = '知识星球' 
        return [...args]
      })
  },
  runtimeCompiler: true,
  devServer: {
    
    port: port,
    open: true,
    clientLogLevel: 'none',
    // socket: 'socket',
    // webSocketServer: 'ws',
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/socket.io': {
        // target: 'http://192.168.63.218:8021',
        target: 'http://www.zyd112.xyz:8021',
        ws: true,
        changeOrigin: true
      },
      '/sockjs-node': {
        // target: 'http://192.168.63.218:8021',
        target: 'http://www.zyd112.xyz:8021',
        ws: false,
        changeOrigin: true
      },
      '/api': {
        // target: 'http://192.168.63.218:6789',
        target: 'http://121.40.140.122:8789',
        changeOrigin: true,
      },


    }
  },

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: '知识星球',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    module:{
      rules:[
        {
          test:/\.(otf|svg|ttf|woff|woff2)\w*/,
          loader:"url-loader?limit=10000"
        }
      ],
    },
    // chainWebpack: config =>{
    //   config.plugin('html')
    //     .tap(args => {
    //       args[0].title = "知识星球";
    //       return args;
    //     })
    // }
    
  },
}