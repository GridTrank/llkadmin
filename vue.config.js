const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath:'./',
  devServer: {               
    port: 8082,            
    proxy: {                
        'sys': {             
            target: 'http://apisllk.kjlke.com/sys',   
            changeOrigin: true,              
            pathRewrite: {             
                '^/sys': ''                    
            }
        }
    }
  }
})
