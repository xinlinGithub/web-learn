var url = require("url");
var path = new Map();
var timeUtil = require("../util/timeUtil");
var retUtil = require("../util/retUtil");
var blogDetail = require("../dao/blog_detail");
var captcha = require("svg-captcha");//用来写验证码；
function queryBlogByid(request, response) {
    var params = url.parse(request.url, true).query;
    blogDetail.queryBlogByid(params.bid, function (result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "查询指定博客成功", result));
        response.end()
    })
}
path.set("/queryBlogByid", queryBlogByid);

function insertIntoComment(request, response) {
    var params = url.parse(request.url, true).query;
    blogDetail.insertIntoComment(params.blog_id,params.parent, params.user_name, params.comment, params.email, timeUtil.getNow(), timeUtil.getNow(), params.parent_name, function(result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "插入评论成功", result));
        response.end()
    })
}
path.set("/insertIntoComment", insertIntoComment);
//的到随机大验证码
function queryRandomCode(request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200,{"Content-Type": "image/svg+xml; charset=utf8"});
    response.write(retUtil.writeResult("success", "获取验证码成功", img));
    response.end()
}
path.set("/queryRandomCode", queryRandomCode);

// 查询每一篇文章的评论总数
function queryCommentCountByBlogid(request, response) {
    var params = url.parse(request.url, true).query;
    blogDetail.queryCommentCountByBlogid(params.bid, function (result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "查找评论总数成功", result));
        response.end()
    })
}
path.set("/queryCommentCountByBlogid",queryCommentCountByBlogid);
// 获取每一篇文章的评论内容
function queryCommentsByBid(request, response) {
    var params = url.parse(request.url, true).query;
    blogDetail.queryCommentsByBid(parseInt(params.bid), function (result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "查找评论内容成功", result));
        response.end()
    })
}
path.set("/queryCommentsByBid", queryCommentsByBid);
// 点击之后更新浏览量
function updateBlogViewsByBid(request, response) {
    var params = url.parse(request.url, true).query;
    blogDetail.updateBlogViewsByBid(params.bid, function (result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "更新博客浏览量成功", result));
        response.end()
    })
}
path.set("/updateBlogViewsByBid", updateBlogViewsByBid);

function queryCommentById(request, response) {
    var params = url.parse(request.url, true).query;
    blogDetail.queryCommentById(params.maxList, function (result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "更新博客浏览量成功", result));
        response.end()
    })
}
path.set("/queryCommentById", queryCommentById);


module.exports.path = path;
