
// 用net模块真正的去监听浏览器
var net = require("net");
var fs = require("fs")
var globalConfig = require("./config.js");
// console.log(globalConfig)
var server = net.createServer();
server.listen(globalConfig.port, "127.0.0.1");
server.on("listening", function() {
    console.log("server has connected")
})
server.on("connection", function(socket) {
    // 相当于浏览器
    socket.on("data", function (data) {
        var res = data.toString()
        console.log(res)
        // 拿到拼接在URL前面的地址
        var gloaFs = res.split("\r\n")[0].split(" ")[1];
        // console.log(gloaFs, __dirname)
        try {
            var url = fs.readFileSync(globalConfig.basePath + gloaFs);
            socket.write("HTTP/1.1 200OK\r\n\r\n")    
            socket.write(url);
            socket.end();               
        } catch (error) {
            socket.write("HTTP/1.1 404\r\nContent-type:text/html\r\n\r\n<html><body><h1>404 not found!</h1></body></html>");
            socket.end();        
        }
    })
})