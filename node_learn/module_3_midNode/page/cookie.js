// 封装cookie获取方法一
function getCookie(key) {
        var key = encodeURIComponent(key);
 
        var result;
        var pairs = document.cookie.split('; ');
        var i, len, item, value;
 
        for (i = 0, len = pairs.length; i < len; ++i) {
            item = pairs[i];
            if (item.indexOf(key) === 0) {
                value = decodeURIComponent(item.slice(item.indexOf('=') + 1));
                if (typeof result === 'undefined') {
                    result = value;
                } else if (typeof result === 'string') {
                    result = [result];
                    result.push(value);
                } else {
                    result.push(value);
                }
            }
        }
 
        return result;
}
// 封装cookie获取方法二
function getCookie(key){
       var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return null;
         }
};
// 封装cookie设置方法
function setCookie(name, value, day){
   if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭     后删除
         var expires = day * 24 * 60 * 60 * 1000;
         var date = new Date(+new Date()+expires);
         document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
  }else{
         document.cookie = name + "=" + escape(value);
  }
}