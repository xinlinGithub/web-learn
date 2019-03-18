

//拦截器 一般放在后端去拦截 因为这样比较安全
var globleConfig = require("../conf.js");
var url = require("url");
function filterLogin(request, response) {
    var pathName = url.parse(request.url).pathname;
    if(pathName == "/login.html" || pathName == "/login" || pathName == "/regist.html" || pathName == "/regist" || isStaticFile(pathName)) {
        return true;
    }
    if(request.headers.cookie){
        //看有没有设置cookie 设置了证明login页面已经登录过 这是就可以跳转内部页面
        // 否则就跳转首页  但这只是基本的登录系统 还有很多弊端 比如cookie值需要加密
        // 存到数据库中的密码也需要加密 防止黑客攻击数据控
        var cookie = request.headers.cookie.split("; ");
        for(var i = 0; i < cookie.length; i++) {
            if(cookie[i].split("=")[0].trim() == "id"){
                return true;
            }
        }
    }
    //ajax 和 form表单请求的数据都可以用 都能跳转页面
    response.writeHead(302, {"location": "/login.html"});
    response.end();//此时并没有加载任何页面 一旦加载了页面 对于ajax就不能用这种方法跳转
    // 一般用于前端跳转页面
    // location.href = "/login.html";只能在ajax请求后跳转页面时用
    return false;
}

function isStaticFile(pathName) {//看是不是静态文件
    var temp = globleConfig.static_file_style;
    for (var i = 0; i < temp.length; i++) {
        if(pathName.indexOf(temp[i]) == pathName.length - temp[i].length){
            if(temp[i] == ".html") {
                continue;
            }
            return true;
        }
    }
    return false;
}

module.exports = filterLogin;