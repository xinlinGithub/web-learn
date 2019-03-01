var fs = require("fs");

var file = fs.readFileSync("./server.conf").toString().split("\r\n");

var globalConfig = {};
for(var i = 0; i < file.length; i++) {
    globalConfig[file[i].split("=")[0]] = file[i].split("=")[1];
}

if(globalConfig.static_file_style) {
    globalConfig.static_file_style = globalConfig.static_file_style.split("|");
}else{
    throw new Error("static_file_style is not found");
}

module.exports = globalConfig;