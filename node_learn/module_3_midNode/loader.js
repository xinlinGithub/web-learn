var fs = require("fs");
var globleConfig = require("./conf.js");

var webDir = fs.readdirSync(globleConfig.web_path);
var controllerSet = [];
var pathWeb = new Map();
console.log(webDir);

for (var i = 0; i < webDir.length; i++) {
    var temp = require("./" + globleConfig.web_path + "/" + webDir[i]);
    if(temp.path){//循环遍历 path 且看它有没有存在 存在了就说明不唯一 报错
        for (var [key, value] of temp.path) {
            if(!pathWeb.has(key)){
                pathWeb.set(key,value);
            }else{
                //一个动态请求只能对应一个方法 有多余的就报错
                throw new Error("url方法异常，有重复！in" + key);
            }
        }
        controllerSet.push(temp.path);
    }
}

module.exports = pathWeb;