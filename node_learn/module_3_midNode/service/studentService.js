//服务层 专门调用服务器 没有别的功能
var studentDao = require("../dao/studentDao.js");

function queryAllStudents(success) {
    // 传个回调函数 让他处理一些操作
    studentDao.queryAllStudents(success);
}
function queryStudentsByAgeAndClass(age, className) {
    studentDao.queryStudentsByAgeAndClass(age, className);
}

function queryStudentsByStuNum(stuNum, success) {
    studentDao.queryStudentsByStuNum(stuNum, success);
}

function insertIntoStudent(dataArr,success) {
    studentDao.insertIntoStudent(dataArr, success);
}

module.exports = {
    "queryAllStudents": queryAllStudents,
    "queryStudentsByAgeAndClass": queryStudentsByAgeAndClass,
    "queryStudentsByStuNum": queryStudentsByStuNum,
    "insertIntoStudent": insertIntoStudent
}