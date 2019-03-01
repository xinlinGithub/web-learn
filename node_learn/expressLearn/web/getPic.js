var map = new Map();
var url = require("url");
var fs = require("fs");
//图片上传后加载出来 进行读文件操作
function getPic(request, response) {
    var params = url.parse(request.url, true).query;
    try{
        var data = fs.readFileSync("./" + params.path);
        if(data) {
            response.writeHead(200);
            response.write(data);
            response.end();
        }else{
            response.end("not Found!");
        }
    }catch(e) {
        response.end("file is fail!");
    }
}

map.set("/getPic", getPic);

module.exports = map;