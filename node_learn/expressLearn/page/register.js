




function reset() {
    document.getElementById("iFrom").reset();
}
function register() {
    var name = document.getElementById("name").value;
    var stu_num = document.getElementById("stu_num").value;
    var age = document.getElementById("age").value;
    var _class = document.getElementById("class").value;
    var pwd = document.getElementById("password").value;
    var pwd1 = document.getElementById("password1").value;
    if(pwd != pwd1) {
        alert("两次密码不一致，请重新输入密码！");
        return false;
    }
    if(!name || !age || !stu_num || !_class || !pwd || !pwd1) {
        alert("有未知项为空！请补全信息！");
        return false;
    }
    
    setTimeout(function() {
        reset();
    },10)
    return true;
    // var data = `stu_num=${stu_num}&name=${name}&age=${age}&class=${_class}&password=${pwd}`;
    // ajax("post", "/regist", data, success, true);
}
