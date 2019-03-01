

// 写访问的动态文件的URL对应的方法
// 每个URL对应一个方法 唯一
var url = require("url");
var studentService = require("../service/studentService.js");
var path = new Map();
function getData(request,response) {
    // 在每个方法里面处理相应的操作
    // throw new Error("一个来自程序运行时的错误！");

    // response.writeHead(200);
    // response.write("visiting getData!");
    // response.end();//数据并不是直接写到页面上 而是写到控制台 response中

    studentService.queryAllStudents(function (result) {
        var resArr = [];
        for (var i = 0; i < result.length; i++) {
            resArr.push(result[i].name);
        }
        response.writeHead(200);
        response.write("<html><head><meta charset='UTF-8'></head><body><h1>"+ resArr.toString() +"</h1></body></html>");
        response.end();
    })
}
path.set("/getData",getData);

function login(request, response) {//转门用于回复ajax请求的 所以 跳转页面有别于其他页面
    // var params = url.parse(request.url, true).query;
    request.on("data", function(data) {
        var params = data.toString().split("&");
        var myData = {};
        for(var i = 0; i < params.length; i ++){
            myData[params[i].split("=")[0]] = params[i].split("=")[1];
        }
        //用post方法请求数据 需要监听“data"事件
        studentService.queryStudentsByStuNum(myData.stu_num,function (result) {
            var ret;
            console.log(result)
            if(result == null || result.length == 0) {
                ret = "fail";
                response.write(ret);
                response.end();
            }else {
                if(myData.password == result[0].psd) {
                    ret = "ok";
                    response.write("id=" + result[0].id.toString());
                    response.end();
                    //这是form表单专用的 在ajax访问时不能直接跳转 但别的页面可以
                    // response.writeHead(302, {"location": "/main.html","Set-Cookie": "id=" + result[0].id});
                    // response.end();                                  // 写cookie key-value
                    //当没有ajax请求时 用这种方法跳转页面 也就是form表单形式
                }else{
                    ret = "errorPsd";
                    response.write(ret + " !请重新输入密码！")
                    response.end();
                }
            }
        })
    })
}
path.set("/login",login);

function regist(request, response) {
    request.on("data", function(data) {
        var dataArr = data.toString().split("&");
        var inf = {};
        for (var i = 0; i < dataArr.length; i++) {
            inf[dataArr[i].split("=")[0]] = dataArr[i].split("=")[1];
        }
        studentService.queryStudentsByStuNum(inf.stu_num, function(result) {
            if(result == null || result.length == 0 || !result) {
                studentService.insertIntoStudent([inf.stu_num, inf.name, inf.age, inf.class, inf.password], function (result1) {
                    if(result1) {
                        response.write(result1.insertId.toString());
                        response.end();
                    }else{
                        response.write("error");
                        response.end();
                    }
                });
            }else {
                response.write("fail");
                response.end();
            }
        })
    })
}
path.set("/regist", regist);
module.exports.path = path;