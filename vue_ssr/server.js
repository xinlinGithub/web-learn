const server = require('express')();
const Vue = require('vue');
const serverRenderer = require('vue-server-renderer');

server.get("*",(req,res) => {
    // 先创建Vue实例
    // 再创建server-render实例
    // const renderer = require('vue-server-renderer').createRenderer();    
    // 再renderToString()
    // 在里面res.end(html); 就可以在下面监听了
})
server.listen(3000)

