var net = require("net");
var server = net.createServer();
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
