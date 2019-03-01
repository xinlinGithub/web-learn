

function regist() {
    var name = document.getElementById("name").value;
    var stu_num = document.getElementById("stu_num").value;
    var age = document.getElementById("age").value;
    var _class = document.getElementById("class").value;
    var pwd = document.getElementById("password").value;
    var pwd1 = document.getElementById("password1").value;
    if(pwd != pwd1) {
        alert("两次密码不一致，请重新输入密码！");
        return;
    }
    if(!name || !age || !stu_num || !_class || !pwd || !pwd1) {
        alert("有未知项为空！请补全信息！");
        return;
    }
    var data = `stu_num=${stu_num}&name=${name}&age=${age}&class=${_class}&password=${pwd}`;
    ajax("post", "/regist", data, success, true);
}

function success(text) {
    if(text == "fail") {
        alert("此学号已存在！请重新输入正确学号！");
        return;
    }
    if(text == "error") {
        alert("注册信息格式错误！");
        return;
    }
    if(text) {
        alert("注册成功！");
        location.href = "/login.html";
    }else{
        alert("注册失败！请重新注册！");
    }
}