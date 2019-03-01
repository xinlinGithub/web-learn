var mysql = require("mysql");

function connection() {
    var connection = mysql.createConnection({
        host: "127.0.0.1",
        post: "3306",
        user: "root",
        database: "school",
        password: "123456"
    })

    return connection;
}

module.exports = connection;