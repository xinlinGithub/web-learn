var fs = require("fs")
var globalConfig = {}
var conf = fs.readFileSync("server.conf").toString().split("\r\n");
for (var i = 0; i < conf.length; i++) {
    var tempConf = conf[i].split("=");
    if (tempConf.length < 2) {
        continue;
    } else {
        globalConfig[tempConf[0]] = tempConf[1];
    }
}
if (globalConfig.path_position == "absolute") {
    globalConfig.basePath = globalConfig.path;
} else {
    globalConfig.basePath = __dirname + globalConfig.path;
}
module.exports = globalConfig;