
var mysql = require("mysql");

function connection() {
    var newConnection = mysql.createConnection({
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        password: "123456",
        database: "my_blog"
    })
    return newConnection;
}
// https://github.com/xinlinGithub/PersonalBlog.git
module.exports.connection = connection;

// "repository": {
  //   "type": "git",
  //   "url": "git+https://github.com/xinlinGithub/PersonalBlog.git"
  // },

  // "bugs": {
  //   "url": "https://github.com/xinlinGithub/PersonalBlog/issues"
  // },
  // "homepage": "https://github.com/xinlinGithub/PersonalBlog#readme",