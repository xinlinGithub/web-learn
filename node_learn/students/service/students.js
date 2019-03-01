var students = require("../dao/daoStudents");

function getAllStudents(offset, limit,success) {
    students.getAllStudents(offset, limit,success);
}
function getCountStudents(success) {
    students.getCountStudents(success);
}

module.exports = {
    "getAllStudents": getAllStudents,
    "getCountStudents": getCountStudents
}