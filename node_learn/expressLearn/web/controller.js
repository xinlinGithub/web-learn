
var url = require("url");
var map = new Map();
var serverClass = require("../serveice/serverClass");

function register(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params);
    var paramsArr = [params.stu_num, params.name, params.age, params.class, params.psd];
    serverClass.insertIntoStudents(...paramsArr, function (result) {
        if(result != null) {//由于stu_num设置成unique 所以注册相同的学号就自动失败
            // response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
            // response.write("写入成功！");
            response.redirect("/api/getAllStudents");
            response.end();
        }else {
            // response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
            // response.write("写入失败！");
            response.redirect("/errorRegister.html");
            response.end();
        }
    })
}
map.set("/register",register);

function getAllStudents(request, response) {
    serverClass.quaryAllStudents(function(result) {
        response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        response.write(JSON.stringify(result));
        response.end();
    })
}
map.set("/api/getAllStudents",getAllStudents);

function login(request, response) {
    var pathname = url.parse(request.url).pathname;
    var params = url.parse(request.url, true).query;
    serverClass.quaryStudentByStu_num(parseInt(params.stu_num),function(result) {
        if(result && result.length > 0) {
            if(result[0].psd == params.psd) {
                response.cookie("id", result[0].id);
                response.redirect("/main.html");
                response.end();
            }else {
                response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
                response.write("密码错误！");
                response.end();
            }
        }else{
            response.redirect("/register.html");
            response.end();
        }
        // response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
        // response.write(JSON.stringify(result));
        // response.end();
    })
}

map.set("/login", login);


function upload(request, response) {
    console.log(request.file);
    var file = request.file;
    var params = [file.originalname, file.mimetype, file.filename,file.path,file.size, request.cookies.id];
    serverClass.insertIntoFiles(...params, function (result) {
        console.log(result);
        if( result != null) {
            response.writeHead(200, {"Content-Type": "application/json; charset=utf8"});
            response.write(file.path);
            response.end();
        }else {
            response.end("write fail!");
        }
    })
    // response.writeHead(200, {"Content-Type": "application/json; charset=utf8"})
}
map.set("/upload", upload);

module.exports = map;