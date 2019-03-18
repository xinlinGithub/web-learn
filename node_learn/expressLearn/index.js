var express = require("express");
var globalConfig = require("./conf");
var loader = require("./loader");
var cookie = require("cookie-parser");// 将cookie转化成一个对象
var multer = require("multer");// 上传文件的中间工具 文件中间件
// express框架是一个功能极简的函数 他是通过调用各种中间件来实现复杂的功能
// 中间件在http请求传输的过程中就相当于一个过滤器 整个http传输可以看做是一个管道
// 而中间件就相当于是管道中的水阀 可以对http请求进行拦截 并访问他的request 和response对象
// 处理之后来决定他何去何从 app.get app.post 都相当于他的中间件 
// 当然还可以从外部引入其他的一些中间件 比如处理cookie 处理文件上传
// 中间件的使用是有先后之分的 就像一个管道中不同位置的阀门有不同的作用一样
var app = new express();
app.use(cookie());//借用cookie-parser中间件工具 并使用他来辅助获得或设置cookie 
var uploadSingle = multer({dest: "./files/"});//规定文件上传后存入的文件夹

app.get("/main.html", function (request, response, next) {
    // 如果想更好的处理错误 还可以有四个参数 err request response next
    // 在使用静态文件之前拦截
    // cookie-parser中间件会直接将request.cookie转化成对象 然后直接获取
    console.log(request.cookies);
    if(request.cookies.id) {
        // 如果有缓存则放行 没有就重定向
        next();
    }else{
        // 可以直接重定向
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
// 页面跳转 使用静态文件
// 写一个文件夹可以使用这个文件夹下的所有页面
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
// 访问动态页面  加载在web层写好的对应回调函数的接口
app.get("/api/getAllStudents", loader.get("/api/getAllStudents"));
app.get("/register", loader.get("/register"));//后面也可以加回调函数

app.get("/login", loader.get("/login"));
//                将你上传的文件加在request对象上 request.file去访问
app.post("/upload", uploadSingle.single("file"), loader.get("/upload"));
app.get("/getPic", loader.get("/getPic"));
//file 证明那个字段是文件
app.listen(globalConfig.port);


// 少了一个下载文件