//封装ajax函数 兼容性
function ajax(method, url, data, callback, flag) {
    var xhl = null;
    if(window.XMLHttpRequest) {
        xhl = new XMLHttpRequest();
    }else{
        xhl = new ActiveXObject("Microsoft.XMLHttp");
    }

    xhl.onreadystatechange = function () {
        if(xhl.readyState == 4 && xhl.status == 200) {
            callback(xhl.responseText);//如果请求成功 就进行一系列的操作
        }
    }

    if(method == "get" || method == "GET") {
        var oDate = new Date();
        var timer = oDate.getTime();
        xhl.open(method, url + "?" + data + "&timer=" + timer,flag);
        xhl.send();
    }else if(method == "post" || method == "POST") {
        xhl.open(method, url, flag);
        xhl.send(data);
    }
}
