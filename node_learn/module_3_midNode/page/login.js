// 发送ajax请求 访问动态文件
// 如何发送：1.平台：浏览器 2：ajax对象 3：备注：open(method,url,asyn/异步)
// 4：发送：send() 5:判断状态：readyState = 4 && status = 200; 方可接受请求
// var xml = new XMLHttpRequest();

// xml.onreadystatechange = function () {//在上面监听
//     if(xml.readyState === 4 && xml.status === 200) {
//         console.log(xml.responseText);
//     }
// }
// xml.open("GET","/getData",true);//发送一个动态请求
// xml.send();

function login() {
    //如果使用form表单的形式 他会自动将数据拼接起来  
    // 拼接方式和下面一样 然后自动发送 就用不着ajax请求了
    var stu_num = document.getElementById("stu_num").value;
    var password = document.getElementById("password").value;
    var params = "stu_num=" + stu_num +"&" + "password=" + password;
    ajax("post", "/login", params,success, true);
}

function success(text) {
    if(text.indexOf("id") != -1) {
        // 在前端设置cookie 并跳转页面
        document.cookie = text;
        location.href = "/main.html";
    }else if(text == "fail"){
        alert("该学号不存在！请先注册！");
        location.href = "/regist.html";
    }else{
        alert(text);
    }
}

