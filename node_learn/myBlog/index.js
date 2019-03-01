var express = require("express");
var globalCongfig = require("./config");
var webMap = require("./loader");
var app = new express();

app.use(express.static('./' + globalCongfig.page_path));

// 处理此动态请求 把编辑的每日一句写入数据库 层层调用
app.post("/getEveryday", webMap.get("/getEveryday"));
app.get("/queryEveryday", webMap.get("/queryEveryday"));
app.post("/insertBlog", webMap.get("/insertBlog"));
app.get("/queryBlogByPage", webMap.get("/queryBlogByPage"));
app.get("/queryBlogPageCount", webMap.get("/queryBlogPageCount"));
app.get("/queryBlogByid", webMap.get("/queryBlogByid"));
app.get("/insertIntoComment", webMap.get("/insertIntoComment"));
app.get("/queryRandomCode", webMap.get("/queryRandomCode"));
app.get("/queryCommentCountByBlogid",webMap.get("/queryCommentCountByBlogid"));
app.get("/queryCommentsByBid", webMap.get("/queryCommentsByBid"));
app.get("/queryTags", webMap.get("/queryTags"));
app.get("/queryBlogIdTitle", webMap.get("/queryBlogIdTitle"))


app.get("/queryBlodIdByTagMapping", webMap.get("/queryBlodIdByTagMapping"));
app.get("/queryBlogTags", webMap.get("/queryBlogTags"));
app.get("/queryTagBlogByPage", webMap.get("/queryTagBlogByPage"));
app.get("/queryTagBlogPageCount", webMap.get("/queryTagBlogPageCount"));
app.get("/updateBlogViewsByBid", webMap.get("/updateBlogViewsByBid"));
app.get("/queryBlogByViews", webMap.get("/queryBlogByViews"));
app.get("/queryCommentById", webMap.get("/queryCommentById"));
app.listen(globalCongfig.port, function () {
    console.log("服务器已启动！");
})













