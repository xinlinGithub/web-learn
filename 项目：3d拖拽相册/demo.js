init();
function init() {
    var img = $('img');
    var len = img.length;
    var deg = 360 / len;
    for(var i = 0; i < len; i++){
        $(img[i]).css({
            transform: 'rotateY('+ i*deg + 'deg) translateZ(350px)',
            transition: 'transform 1s ' + (len - i - 1) / 10 + 's'
            // 第一个在最下面 延迟最长 最后一个在最上面 没有延迟 一刷新就动
        })
    }
    bindEvent();
}
function bindEvent() {
    var box = $('.box');
    var body = $('body');
    var lastX, lastY, nowX, nowY, disX, disY, rowX = 0, rowY = 0;
    var timer;
    body.on('mousedown',function(e){
        lastX = e.clientX;
        lastY = e.clientY;
        // console.log(lastX)
        clearInterval(timer);
        body.on('mousemove',function(e){
            nowX = e.clientX;
            nowY = e.clientY;
            disX = nowX - lastX;
            disY = nowY - lastY;
            // 角度顺时针为正； 相对于正方向而言
            rowX -= disY * 0.2; // 一次一次叠加
            rowY += disX * 0.2;
            box.css({
                transform: 'rotateX(' + rowX + 'deg) rotateY(' + rowY + 'deg)'
            })
            lastX = nowX;
            lastY = nowY;
            
        })
        body.on('mouseup',function(){
            body.off('mousemove');
            clearInterval(timer);
            // console.log(disX,disY)
            // 松开时也相当于移动了一下 慢划慢松 则最后两次相距很近 缓冲距离小
            // 快滑快松 则最后两次相距比较远 缓冲距离大
            timer = setInterval(function(){
                disX *= 0.98;
                disY *= 0.98;
                rowX -= disY * 0.2; // 一次一次叠加
                rowY += disX * 0.2;
                box.css({
                    transform: 'rotateX(' + rowX + 'deg) rotateY(' + rowY + 'deg)'
                })
            },20)
            if(Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1){
                clearInterval(timer);
            }
        })
    return false;        
    })
}