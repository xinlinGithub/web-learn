
var fs = require("fs");
var conf = fs.readFileSync("./server.conf").toString().split("\r\n");
var globalConfig = {};

for(var i = 0; i < conf.length; i++) {
    globalConfig[conf[i].split("=")[0]] = conf[i].split("=")[1];
}
 module.exports = globalConfig;