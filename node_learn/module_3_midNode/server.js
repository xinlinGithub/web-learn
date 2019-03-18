var http = require("http");//引入html 模块 用来解析http协议 简单说就是获得输入的网址
var url = require("url");//用来操作请求的文件名 包括后面拼接的变量
var fs = require("fs");//读文件
var globleConf = require("./conf.js");//引入配置对象
var loader = require("./loader.js");
var log = require("./log.js");
var filter = require("./loaderFilter.js");
// console.log(globleConf)

// 这里面不包含业务逻辑 只是对架构运行的处理 在别的网站也同样适用 如电商 博客等等
http.createServer(function(request, response) {
    console.log("服务已启动");
    var pathName = url.parse(request.url).pathname;
    var params = url.parse(request.url, true).query;
    // console.log(pathName,params);
    // console.log(globleConf.page_path + pathName)
    for(var i = 0; i < filter.length; i++) {//过滤 禁止直接访问内部文件只能访问首页
        if(!filter[i](request, response)){
            return ;
        }
    }
    log(pathName);//打印日志  防止错误过多
    for(var prop in params) {
        log(params[prop]);
        console.log(params[prop],prop);
    }
    if(isStaticFile(pathName)) {//访问静态文件
        try{//看能不能读取文件
            var data = fs.readFileSync(globleConf.page_path + pathName);
            response.writeHead(200);
            response.write(data);
            response.end();
        }catch(e){//不能正确读取就返回404
            response.writeHead(404);
            response.write("<html><body><h1>404 not found!</h1></body></html>");
            response.end();
        }
    }else{//访问动态文件
        console.log(pathName);
        if(loader.has(pathName)) {
            try{//操作与请求动态数据相对应的方法 将他从web层加载出来
                console.log(loader.get(pathName));
                // 接口处理数据
                loader.get(pathName)(request,response);
            }catch(e){
                response.writeHead(500);//服务器端错误
                response.write("<html><head><meta charset='UTF-8'></head><body><h1>500 BadServer!</h1></body></html>");
                response.end();
            }
        }else {
            response.writeHead(404);//客户端错误
            response.write("<html><head><meta charset='UTF-8'></head><body><h1>404 not Found</h1></body></html>");
            response.end();
        }
    }
}).listen(globleConf.port);

function isStaticFile(pathName) {//看是不是静态文件
    var temp = globleConf.static_file_style;
    for (var i = 0; i < temp.length; i++) {
        if(pathName.indexOf(temp[i]) == pathName.length - temp[i].length){
            return true;
        }
    }
    return false;
}