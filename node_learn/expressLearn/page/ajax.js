//封装ajax函数 兼容性
function ajax(method, url, data, callback, flag) {
    var xhr = null;
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);//如果请求成功 就进行一系列的操作
        }
    }

    if(method == "get" || method == "GET") {
        var oDate = new Date();
        var timer = oDate.getTime();
        xhr.open(method, url + "?" + data + "&timer=" + timer,flag);
        xhr.send();
    }else if(method == "post" || method == "POST") {
        xhr.open(method, url, flag);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
}
