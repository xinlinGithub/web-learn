var dbutil = require("./dbutil");

function insertBlog(title,content, views, tags,ctime, utime,success) {
    var sql = "insert into blog(`title`, `content`, `views`, `tags`,`ctime`,`utime`) values (?,?,?,?,?,?);";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, [title,content,views,tags, ctime,utime], function(error, result) {
        if(result != null) {
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function queryTags(tag,success) {
    var sql = "select * from tags where tag = ?;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql,tag, function (error, result) {
        if(result != null) {
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function insertTags(tag, ctime, utime, success) {
    var sql = "insert into tags (`tag`, `ctime`, `utime`) values (?,?,?);";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, [tag, ctime, utime], function (error, result) {
        if(result != null) {
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function insertTagBlogMipping(tag_id, blog_id, ctime, success) {
    var sql = "insert into tag_blog_mipping (`tag_id`,`blog_id`,`ctime`) values (?,?,?);";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, [tag_id, blog_id, ctime], function(error, result) {
        if(result != null) {
            success(result);
        }else {
            console.log(error);
        }
    })
    connection.end();
}

function queryBlogByPage(page, pageSize,success) {
    var sql = "select * from blog order by id desc limit ?,?;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, [page * pageSize, pageSize], function (error, result) {
        if(result != null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function queryTagBlogByPage(tags,page, pageSize,success) {
    var sql = "select * from blog where find_in_set(?,`tags`) order by id desc limit ?,?;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, [tags,page * pageSize, pageSize], function (error, result) {
        if(result != null){
            success(result);
        }else{ 
            console.log(error);
        }
    })
    connection.end();
}
function queryBlogPageCount(success) {
    var sql = "select count(1) as count from blog;";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql, function (error, result) {
        if(result != null) {
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function queryTagBlogPageCount(tags,success) {
    var sql = "select count(1) as count from blog where find_in_set(?,`tags`);";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql,tags, function (error, result) {
        if(result != null) {
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
function queryBlogByViews(maxList, success) {
    var sql = "select * from blog order by views desc limit ?";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(sql,parseInt(maxList), function (error, result) {
        if(result != null) {
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
module.exports = {
    "insertBlog": insertBlog,
    "queryTags": queryTags,
    "insertTags": insertTags,
    "insertTagBlogMipping": insertTagBlogMipping,
    "queryBlogByPage": queryBlogByPage,
    "queryBlogPageCount": queryBlogPageCount,
    "queryTagBlogByPage": queryTagBlogByPage,
    "queryTagBlogPageCount": queryTagBlogPageCount,
    "queryBlogByViews": queryBlogByViews
}