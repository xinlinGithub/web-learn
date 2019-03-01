var dbutil = require("./dbutil");


function queryTags(success) {
    var sql = "select * from tags order by id desc;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, function(error, result) {
        if(result != null) {
            success(result);
        }else {
            console.log(error);
        }
    })
    connection.end();
}


function queryBlogIdTitle(success) {
    var sql = "select id, title from blog;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, function(error, result) {
        if(result != null) {
            success(result);
        }else {
            console.log(error);
        }
    })
    connection.end();
}
function queryBlodIdByTagMapping(tagid, success) {
    var sql = "select blog_id from tag_blog_mipping where tag_id = ? order by id desc;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, tagid, function(error, result) {
        if(result != null) {
            success(result);
        }else {
            console.log(error);
        }
    })
    connection.end();
}


module.exports = {
    "queryTags": queryTags,
    "queryBlodIdByTagMapping": queryBlodIdByTagMapping,
    "queryBlogIdTitle": queryBlogIdTitle
}