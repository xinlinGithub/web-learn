module.exports = {
    proxy: {
          '/apis': {    //将www.exaple.com印射为/apis
              target: 'http://news-at.zhihu.com/api/4',  // 接口域名
              secure: false,  // 如果是https接口，需要配置这个参数
              changeOrigin: true,  //是否跨域
              pathRewrite: {
                  '^/apis': ''   //需要rewrite的,
              }              
          },
          '/img': {    //将www.exaple.com印射为/apis
            target: 'https://pic4.zhimg.com',  // 接口域名
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/img': ''   //需要rewrite的,
            }              
        }
    }
}