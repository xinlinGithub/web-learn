
var http = require("http");
var url = require("url");
var fs = require("fs");
var loader = require("./loader");
var globalConfig = require("./conf");


http.createServer(function(request, response) {
    var pathName = url.parse(request.url).pathname;

    if(isStaticFile(pathName)){
        try{
            var data =  fs.readFileSync(globalConfig.page_path + pathName);
            response.writeHead(200);
            response.write(data);
            response.end();
        }catch(e) {
            response.writeHead(404);
            response.write("<html><body><h1>404 not found!</h1></body></html>");
            response.end();
        }
    }else {
        if(loader.has(pathName)){
            try{
                loader.get(pathName)(request, response);
            }catch(e) {
                response.writeHead(500);
                response.write("<html><body><h1>500 bad server!</h1></body></html>");
                response.end();
            }
        }else{
            response.writeHead(404);
            response.write("<html><body><h1>404 not found!</h1></body></html>");
            response.end();
        }
    }
    
}).listen(globalConfig.port);


function isStaticFile(pathname) {
    for(var i = 0; i < globalConfig.static_file_style.length; i++) {
        if(pathname.indexOf(globalConfig.static_file_style[i]) == pathname.length - globalConfig.static_file_style[i].length){
            return true;
        }
    }
    return false;
}