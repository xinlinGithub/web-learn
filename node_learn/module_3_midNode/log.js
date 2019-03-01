var fs = require("fs");
var globleConf = require("./conf.js");

function log(data) {
    console.log(globleConf.log_path + "/data.txt")
    // fs.writeFile(globleConf.log_path + "/data.txt",data + "\n",{flag: "a"}, function(){});
    fs.appendFile(globleConf.log_path + "/data.txt",data + "\n", function(){})//它的flag默认为a 
    // 同步的无回调函数 只有异步有 例如上面的
    // flag: 默认为w 只能写入一次 第二次重新写入 a 可叠加写入文本 追加写
    // r 可读
    // r+ 可读可写
    // w 可写 可创建
    // +就是缺啥补啥 但一般不用 设计模式讲究的是单一职责原则
    // a 追加写 可创建
    // x排他 就是自己操作时不允许别人操作
    // 写文件 
}

module.exports = log;