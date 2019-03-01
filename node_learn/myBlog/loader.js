var fs = require("fs");
var globalConfig = require("./config");
var webDir = fs.readdirSync("./" + globalConfig.web_path);

var webMap = new Map();
for(var i = 0; i < webDir.length; i++) {
    var temp = require("./" + globalConfig.web_path + "/" + webDir[i]);
    if(temp.path) {
        for(var prop of temp.path) {
            if(webMap.has(prop[0])){
                throw new Error("一个请求对应多个方法！")
            }else{
                webMap.set(prop[0], prop[1]);
            }
        }
    }
}

module.exports = webMap;