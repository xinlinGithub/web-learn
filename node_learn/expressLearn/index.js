var express = require("express");
var globalConfig = require("./conf");
var loader = require("./loader");
var cookie = require("cookie-parser");
var multer = require("multer");// 上传文件的中间工具

var app = new express();
app.use(cookie());//借用cookie-parser工具 并使用他来辅助获得或设置cookie
var uploadSingle = multer({dest: "./files/"});

app.get("/main.html", function (request, response, next) {
    // 在使用静态文件之前拦截
    console.log(request.cookies);
    if(request.cookies.id) {
        next();
    }else{
        response.redirect("/login.html");
        response.end();
    }
})

app.get("/uploadFile.html", function (request, response, next) {
    // 在使用静态文件之前拦截
    console.log(request.cookies);
    if(request.cookies.id) {
        next();
    }else{
        response.redirect("/login.html");
        response.end();
    }
})
// 页面跳转
app.use(express.static(globalConfig.page_path));
app.get("/api/*", function (request, response,next) {
    console.log(request.cookies,"静态");//拦截动态请求 在使用之前拦截
    if(request.cookies.id) {
        // response.redirect("/api/getAllStudents");
        next();
    }else {
        response.redirect("/login.html");
        response.end();
    }
})
// 访问动态页面
app.get("/api/getAllStudents", loader.get("/api/getAllStudents"));
app.get("/register", loader.get("/register"));//后面也可以加回调函数

app.get("/login", loader.get("/login"));

app.post("/upload", uploadSingle.single("file"), loader.get("/upload"));
app.get("/getPic", loader.get("/getPic"));
//file 证明那个字段是文件
app.listen(globalConfig.port);


// 少了一个下载文件