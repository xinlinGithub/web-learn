var fs = require("fs");
var config = fs.readFileSync("./server.config").toString().split("\r\n");
var globalConfig = {};

for(var i = 0; i < config.length; i++) {
    if(config[i].split("=").length > 1) {
        globalConfig[config[i].split("=")[0].trim()] =  config[i].split("=")[1].trim();
    }
}

module.exports = globalConfig;
