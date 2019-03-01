var url = require("url");
var path = new Map();
var timeUtil = require("../util/timeUtil");
var retUtil = require("../util/retUtil");
var siteMap = require("../dao/siteMap");
var path = new Map();
function queryTags(request, response) {
    siteMap.queryTags(function (result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "查询tags成功", result));
        response.end()
    })
}

path.set("/queryTags", queryTags);



function queryBlogIdTitle(request, response) {
    siteMap.queryBlogIdTitle(function (result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "查询blogtitle成功", result));
        response.end()
    })
}
path.set("/queryBlogIdTitle", queryBlogIdTitle);

function queryBlodIdByTagMapping(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params);
    siteMap.queryBlodIdByTagMapping(params.id, function (result){
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "查询映射成功", result));
        response.end()
    })
}
path.set("/queryBlodIdByTagMapping", queryBlodIdByTagMapping);

function queryBlogTags(request, response) {
    siteMap.queryTags(function (result) {
        var newResult = result.sort(function() {
            return Math.random() > 0.5 ? true : false;
        });
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "查询tags成功", newResult));
        response.end()
    })
}
path.set("/queryBlogTags",queryBlogTags);
module.exports.path = path;
