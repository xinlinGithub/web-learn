// import { create } from "domain";

// 连接数据库层  mysql根据不同的语言编写了不同的驱动 
// 不同的语言利用驱动都能通过调用显卡连接服务器
//一个dao文件对应一个表的操作 因为可能有很多表 防止耦合 也符合单一职责原则
var mysql = require("mysql");//不是node.js自带的 必须用npm安装
//建立连接
function connection() {
    var connection = mysql.createConnection({
        host: "127.0.0.1",//服务器地址
        port: "3306",//端口
        user: "root",//用户 root为默认
        password: "123456",//密码
        database: "school"//要连接的数据库
    })
    return connection;
}


module.exports.connection = connection;