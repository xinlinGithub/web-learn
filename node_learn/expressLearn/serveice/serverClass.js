var classDao = require("../dao/classDao");

function quaryAllStudents(success) {
    classDao.quaryAllStudents(success);
}
function quaryStudentByStu_num(stu_num, success) {
    classDao.quaryStudentByStu_num(stu_num,success);
}

function insertIntoStudents(stu_num,name,age,_class,psd,success) {
    classDao.insertIntoStudents(stu_num,name,age,_class,psd,success);
}
function insertIntoFiles(originalname,mimetype,filename,path,size,id,success) {
    classDao.insertIntoFiles(originalname,mimetype,filename,path,size,id,success);
}
module.exports = {
    "quaryAllStudents": quaryAllStudents,
    "quaryStudentByStu_num": quaryStudentByStu_num,
    "insertIntoStudents": insertIntoStudents,
    "insertIntoFiles": insertIntoFiles
}