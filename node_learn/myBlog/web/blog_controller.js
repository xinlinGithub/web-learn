var url = require("url");
var path = new Map();
var timeUtil = require("../util/timeUtil");
var retUtil = require("../util/retUtil");
var blogDao = require("../dao/blog");

//插入博客内容
function insertBlog(request, response) {
    var params = url.parse(request.url, true).query;
    var title = params.title;
    var tags = params.tags.replace('，', ",").trim().replace(/\s/g, "");
    //把中文逗号换成英文逗号 把空格去掉
    request.on("data", function (data) {//post请求
        blogDao.insertBlog(title, data.toString(), 0, tags, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            var tagArr = tags.split(",");
            for(var i = 0; i < tagArr.length; i++) {
                if(tagArr[i] == null) {
                    continue;
                }
                queryTags(tagArr[i], result.insertId);
            }
            response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
            response.write(retUtil.writeResult("success", "添加成功", timeUtil.getNow()));
            response.end()
        });
        
    })

}
path.set("/insertBlog", insertBlog);

// 由限制条件查询若干博客  以达到翻页的效果
function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function(result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "查询成功", result));
        response.end()
    })
}
path.set("/queryBlogByPage", queryBlogByPage);

// 查询与标签相关的博客内容
function queryTagBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    var tags = params.tags;
    blogDao.queryTagBlogByPage(tags,parseInt(params.page), parseInt(params.pageSize), function(result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "查询标签对应的文章成功", result));
        response.end()
    })
}
path.set("/queryTagBlogByPage", queryTagBlogByPage);

// 查询总的博客数量 然后去渲染页面
function queryBlogPageCount(request, response) {
    blogDao.queryBlogPageCount(function(result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "查询count成功", result));
        response.end()
    })
}
path.set("/queryBlogPageCount", queryBlogPageCount);

//  查询与标签相关的博客总数
function queryTagBlogPageCount(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryTagBlogPageCount(params.tags,function(result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "查询count成功", result));
        response.end()
    })
}
path.set("/queryTagBlogPageCount", queryTagBlogPageCount);

//查询tags
function queryTags(tag, blog_id) {
    blogDao.queryTags(tag, function (result) {
        if(result == null || result.length == 0) {
            insertTags(tag, blog_id);
        }else{
            insertTagBlogMipping(result[0].id, blog_id)
        }
    })
}

//插入tags
function insertTags(tag, blog_id) {
    blogDao.insertTags(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMipping(result.insertId, blog_id);
    })
}
//插入tags和blogs的映射
function insertTagBlogMipping(tag_id, blog_id) {
    blogDao.insertTagBlogMipping(tag_id, blog_id, timeUtil.getNow(), function(result) {
        console.log("插入映射成功！")
    })
}

function queryBlogByViews(request, response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByViews(params.maxList, function (result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(retUtil.writeResult("success", "更新博客浏览量成功", result));
        response.end()
    })
}
path.set("/queryBlogByViews", queryBlogByViews);
module.exports.path = path;

