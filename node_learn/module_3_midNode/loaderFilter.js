//加载filter里所有的拦截器
var fs = require("fs");
var globleConfig = require("./conf.js");

var filterDir = fs.readdirSync(globleConfig.filter_path);
//读取文件夹中的每个文件  把文件目录存到一个数组中
var filterSet = [];

for (var i = 0; i < filterDir.length; i++) {
    var temp = require("./" + globleConfig.filter_path + "/" + filterDir[i]);
    filterSet.push(temp);
}

module.exports = filterSet;
