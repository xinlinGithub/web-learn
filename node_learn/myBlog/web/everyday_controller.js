var daoDbutil = require("../dao/insertEveryday");
var timeUtil = require("../util/timeUtil");
var retUtil = require("../util/retUtil");
var path = new Map();

function getEveryday(request, response) {
    request.on("data", function (data) {//post请求
        daoDbutil.insertEveryday(data.toString(), timeUtil.getNow(), function (result) {
            response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
            response.write(retUtil.writeResult("success", "添加成功", result));
            response.end();
        })
    })
}
path.set("/getEveryday", getEveryday);

function queryEveryday(request, response) {
    // get请求
    daoDbutil.queryEveryday(function(result) {//把请求到的数据返回 再渲染到页面
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "添加成功", result));
        response.end();
    })
}


path.set("/queryEveryday", queryEveryday);

module.exports.path = path;
