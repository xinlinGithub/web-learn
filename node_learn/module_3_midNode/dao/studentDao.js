var dbutil = require("./dbutil.js");

function queryAllStudents(success){//一般禁用
    //sql语句
    var querySql = "select * from students;";
    var connection = dbutil.connection();
    connection.connect();//连接数据库
    connection.query(querySql, function (error, result) {
        if(error == null) {//无错误就有结果
            success(result)
            console.log(result);
        }else{//有错误 就无结果
            console.log(error);
        }
    })
    connection.end();//最后一定要结束连接 否则每访问一条数据都会连接一次 很浪费性能
}

function queryStudentsByAgeAndClass(age,className) {
        //sql语句
    var querySql = "select * from students where age > ? and class = ?;";
    var queryParams = [].slice.call(arguments);//将参数转化成数组
    var connection = dbutil.connection();
    
    connection.connect();//连接数据库
                        //这儿写参数 多个就用数组表示 用来表示条件
    connection.query(querySql, queryParams, function (error, result) {
        if(error == null) {//无错误就有结果
            console.log(result);
        }else{//有错误 就无结果
            console.log(error);
        }
    })
    connection.end();//最后一定要结束连接 否则每访问一条数据都会连接一次 很浪费性能
}

function queryStudentsByStuNum(stuNum,success) {
    //sql语句
    var querySql = "select * from students where stu_num = ?;";
    var connection = dbutil.connection();
    //每次都创建一个新的连接 去连接服务器 这样就可以重复请求数据 并且最后还关掉
    // 这样也不会太浪费性能
    connection.connect();//连接数据库
    connection.query(querySql, stuNum,function (error, result) {
        
        success(result)
        
    })
    connection.end();//最后一定要结束连接 否则每访问一条数据都会连接一次 很浪费性能
}
// queryAllStudents();
// queryStudentsByAgeAndClass(30, 163);

function insertIntoStudent(data,success) {
    var querySql = "insert into students (`stu_num`,`name`,`age`,`class`,`psd`) values (?,?,?,?,?);";
    var connection = dbutil.connection();
    connection.connect();
    connection.query(querySql, data, function(error, result) {
        success(result)
        // OkPacket {
        //     fieldCount: 0,
        //     affectedRows: 1,
        //     insertId: 11,
        //     serverStatus: 2,
        //     warningCount: 0,
        //     message: '',
        //     protocol41: true,
        //     changedRows: 0 }
    })
}
module.exports = {
    "queryAllStudents": queryAllStudents,
    "queryStudentsByAgeAndClass": queryStudentsByAgeAndClass,
    "queryStudentsByStuNum":queryStudentsByStuNum,
    "insertIntoStudent":insertIntoStudent
}