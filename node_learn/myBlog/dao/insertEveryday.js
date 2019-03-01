var dbutil = require("./dbutil");

function insertEveryday(content, ctime, success) {
    var sql = "insert into everyday(`content`, `ctime`) values (?, ?);";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, [content, ctime], function(error, result) {
        if(result != null) {
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function queryEveryday(success) {
    var sql = "select * from everyday order by id desc limit 1;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, function(error, result) {
        if(result != null) {
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
module.exports = {
    "insertEveryday": insertEveryday,
    "queryEveryday": queryEveryday
}