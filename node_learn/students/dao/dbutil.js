
var mysql = require("mysql");
function connection() {
    var connection = mysql.createConnection({
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        password: "123456",
        database: "school"
    })

    return connection;
}

module.exports = connection;