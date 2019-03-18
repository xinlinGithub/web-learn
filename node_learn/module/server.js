var net = require("net");
var server = net.createServer();
// 创建服务 并进行监听 如果有响应 则表示连接成功
server.listen(12306, "127.0.0.1");
server.on("listening", function () {
    console.log("服务器已连接")
})
server.on("connection", function (socket) {
    console.log("已连接到客户")
    socket.on("data", function (data) {
        console.log(data.toString())
        socket.write("hello client")
    })
    socket.on("close", function () {// socket all monitor heself if closed
        console.log("client has closed")
        server.close();
    })
})
server.on("close", function () {// monitor if own server is closed.
    console.log("my server has closed")
})

// 词法分析 语法分析 语义分析
// nodejs 和js词法分析 语法分析都相同
// 程序就是运行在操作系统上的 最后语言调用操作系统上的接口 
// nodejs运行在操作系统上 js运行在浏览器上 运行的环境不同 
// nodejs提供的是运行环境 为js提供了多线程的运行环境 使js可以运行在后端上
// 环境不同 语意就不同
// 为什么要用nodejs：
// B/S基于浏览器       C/S基于客户端
// browser/server      client/server
//    前端                后端
// 不要死学语言 要学思想  学网络 学设计模式 学Linux系统 学算法 这是理论
// 不要图个学表层 要学本质 这样才能走的更远
// 最早浏览器 NCSA Mosaic 马赛克  首个可以显示图片的浏览器 伊利诺伊大学 香槟分校 NCSA组织

// user-agent 最早马赛克写在里面 最后卖给娱乐公司 开发人员自己出来干 
// 做了个新的浏览器 mosaic Netscape 0.9 在以前的基础上优化了 很成功 但由于涉及到版权 又重写
// 以mozilla之名重生（又翻译为马赛克杀手）netscape大火  但由于太膨胀 嘲笑微软很卡
// 所以微软自己研发出了ie浏览器 并和window98捆绑销售 人们会根据user-agent去给相应的内容
// ie就把自己的user-agent加上了Mozilla 这样Netscape直接死掉 因为当时ie很好用 人们就没必要下载别的浏览器了
// 这是Mozilla不放弃 以gecko之名重生Mozilla5.0  他的渲染引擎很快 不仅能显示图片 而且很快 最后变成了Firefox火狐
// 还有一个浏览器 KHTML 但没人用它 所以他就把自己写在user-agent上 Linux KHTML like Gecko; 说自己像gecko
// 又出来个Opera欧鹏 他可以自定义user-agent 
// 后来Chrome出现了 带来了js的V8引擎 渲染引擎 js引擎 速度极快 迅速占领市场 
// 在浏览器大战中顺利胜出 nodejs之父(Ryan Dahl) 他是写c语言和c++的 但写web很困难
// 所以他就写了个新的编程语言 nodejs 所以前端功能越来越复杂 后端写不下去了 就出现了个前端行业
// 前端 --> web层接受请求（高并发）--> 业务层（复杂的业务逻辑）--> 持久层（大吞吐量的数据）
// 有了nodejs就可以让前端人员做一些web层的工作 与js同一个语法学习成本低 
// 高性能 无阻塞I/O: 如果正在做A 还有事情B  A请求后端数据C 当B与C无特别联系时 
// 就可以让A请求时B也能执行 就是当A执行时不会阻塞页面的其他进程 这样可以节省总体的事件
// 如果同一时间只能做一件事 其他的得等待这就叫做阻塞I/O Block IO 
// 如果同一时间可以做多件事 就叫做 nonblock IO  所以选择nodejs 学他的思想 不要死学语法
// 学原理

// 浏览器 先解析域名 通过DNS 拿到ip地址 通过反向代理服务器 然后有多台服务器 找到多个服务器中空闲的那一个 
// 服务器通过DB中间件 找到数据库           公司是通过代码服务器 通过release发布机将代码整合提交到服务器上 