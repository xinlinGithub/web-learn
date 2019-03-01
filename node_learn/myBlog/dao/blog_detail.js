var dbutil = require("./dbutil");

function queryBlogByid(bid,success) {
    var sql = "select * from blog where id = ?;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, bid, function (error, result) {
        if(result != null) {
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function insertIntoComment(blog_id, parent, user_name, comment, email, ctime, utime,parent_name,success) {
    var sql = "insert into comment (`blog_id`,`parent`,`user_name`,`comment`,`email`,`ctime`,`utime`, `parent_name`) values(?,?,?,?,?,?,?,?);";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, [blog_id,parent, user_name, comment, email, ctime, utime,parent_name], function (error, result){
        if(result != null) {
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function queryCommentCountByBlogid(bid, success) {
    var sql = "select count(1) as count from comment where blog_id = ?;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, bid, function (error, result) {
        if(result !=  null) {
            success(result);
        }else {
            console.log(error);
        }
    })
    connection.end();
}

function queryCommentsByBid(bid, success) {
    var sql = "select * from comment where blog_id = ? order by id desc;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, bid, function (error, result) {
        if(result != null) {
            success(result);
        }else {
            console.log(error);
        }
    })
    connection.end();
}

function updateBlogViewsByBid(bid, success) {
    var sql = "update blog set views = views + 1 where id = ?;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, bid, function (error, result) {
        if(result != null) {
            success(result);
        }else {
            console.log(error);
        }
    })
}
function queryCommentById(maxList, success) {
    var sql = "select * from comment order by id desc limit ?;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, parseInt(maxList), function (error, result) {
        if(result != null) {
            success(result);
        }else {
            console.log(error);
        }
    })
}

module.exports = {
    "queryBlogByid": queryBlogByid,
    "insertIntoComment": insertIntoComment,
    "queryCommentCountByBlogid": queryCommentCountByBlogid,
    "queryCommentsByBid": queryCommentsByBid,
    "updateBlogViewsByBid": updateBlogViewsByBid,
    "queryCommentById": queryCommentById
}