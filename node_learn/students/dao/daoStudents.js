

var dbutil = require("./dbutil");

function getAllStudents(offset, limit,success) {
    var sql = "select * from students limit ?,?;";
    var connection = dbutil();
    var params = [offset, limit];
    connection.connect();
    connection.query(sql, params, function (error, result) {
        success(result);
    })
    connection.end();
}
function getCountStudents(success) {
    var sql = "select count(1) as count from students;";
    var connection = dbutil();
    connection.connect();
    connection.query(sql, function (error, result) {
        success(result);
    })
    connection.end();
}
module.exports = {
    "getAllStudents": getAllStudents,
    "getCountStudents": getCountStudents
}