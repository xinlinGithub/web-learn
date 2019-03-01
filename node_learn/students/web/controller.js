

var url = require("url");
var map = new Map();
var servers = require("../service/students.js");
function GetStudentsData(request, response) {
    var  params = url.parse(request.url, true).query;
    servers.getAllStudents(parseInt(params.offset), parseInt(params.limit), function (result) {
        if(result && result.length > 0) {
            servers.getCountStudents(function (result1) {
                response.writeHead(200,{"Content-Type": "application/json; charset=utf8"});
                response.write(JSON.stringify({total: result1[0].count, rows: result}));
                response.end();
            })
        }else{
            response.writeHead(404);
            response.write("<html><body><h1>database is not found!</h1></body></html>");
            response.end();
        }
        
    });
    
}

map.set("/GetStudentsData",GetStudentsData);

module.exports = map;