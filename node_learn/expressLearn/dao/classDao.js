var dbutil = require("./dbutil");

function quaryAllStudents(success) {
    var sql = "select * from class162;";
    var connection = dbutil();
    connection.connect();

    connection.query(sql,function (error, result) {
        success(result);
    })
    connection.end();
}

function insertIntoStudents(stu_num,name,age,_class,psd,success) {
    var sql = "insert into class162 (stu_num,name,age,class,psd) values (?,?,?,?,?);";
    var connection = dbutil();
    connection.connect();
    var params = [stu_num,name,age,_class,psd];
    connection.query(sql,params,function (error, result) {
        success(result);
    })
    connection.end();
}

function quaryStudentByStu_num(stu_num,success) {
    var sql = "select * from class162 where stu_num = ?;";
    var connection = dbutil();
    connection.connect();

    connection.query(sql,stu_num,function (error, result) {
        success(result);
    })
    connection.end();
}

function insertIntoFiles(originalname,mimetype,filename,path,size,id,success) {
    var sql = "insert into files_student (files_originalname,files_mimetype,files_filename,files_path,files_size,files_stu) values (?,?,?,?,?,?);";
    var connection = dbutil();
    connection.connect();
    var params = [originalname,mimetype,filename,path,size,id];
    connection.query(sql,params,function (error, result) {
        console.log(error, "错误")
        success(result);
    })
    connection.end();
}
module.exports = {
    "quaryAllStudents": quaryAllStudents,
    "quaryStudentByStu_num": quaryStudentByStu_num,
    "insertIntoStudents": insertIntoStudents,
    "insertIntoFiles":insertIntoFiles
}