var fs = require("fs");
var conf = fs.readFileSync("server.conf").toString().split("\r\n");
var globleConf = {};

for(var i = 0; i < conf.length; i++) {
    var temp = conf[i].split("=");
    if(temp.length > 1) {
        globleConf[temp[0]] = temp[1];
    }
}

if(globleConf.static_file_style) {
    globleConf.static_file_style = globleConf.static_file_style.split("|");
}else{//必须得有static_file_style这个静态文件类型配置
    throw Error("Error: 配置文件不充分！");
}
module.exports = globleConf;