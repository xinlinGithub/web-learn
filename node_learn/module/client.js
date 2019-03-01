var net = require("net");
var socket = net.connect(12306, "127.0.0.1");
socket.setTimeout(1);
socket.on("connect", function () {
    console.log("已连接到服务器")
    console.log(socket.remoteAddress);// 远程的地址
    console.log(socket.remotePort);// 远程的端口
    console.log(socket.localAddress);// 本地的地址
    console.log(socket.localPort);// 本地的端口
})
socket.on("timeout", function () {
    console.log("not connect server")
    socket.end();
})
socket.on("data", function (data) {
    console.log(data.toString())
    socket.end();
})
socket.on("close", function () {//monitor if own service is closed, it has nothing to do with server
    console.log("链接已关闭")
})
socket.write("hello server")