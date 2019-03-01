// 创建元素 将元素变成立方体 在开始运动
var oSolid = document.getElementsByClassName('solid')[0];
var oUl = document.getElementsByClassName('oUl')[0];
var olLi = document.querySelectorAll('ol li');
var ol = document.getElementsByTagName('ol')[0]
var oliArr,n = 0;
var width,timer,lastIndex = 0;
createDom();
function createDom() {
    var len = 100;
    var allWidth = parseInt(oSolid.offsetWidth);
    // window.getComputedStyle(solid,nullk).width
    width = allWidth / len;
    var uHtml = '';
    for(var i = 0; i < len; i++){
        // var oLi = document.createElement('li');
        // oLi.style.width = width + 'px';
        // for(var j = 0; j < 4; j++){
        //     var oDiv = document.createElement('div');
        //     oLi.appendChild(oDiv)
        // }
        // oUl.appendChild(oLi);
        uHtml += `<li><div></div><div></div><div></div><div></div></li>`;
    }
    oUl.innerHTML = uHtml;   
// 设置宽度
    setWidth()
}
function setWidth() {
    var li = document.getElementsByTagName('li');
    oliArr = Array.prototype.slice.call(li);
    oliArr.splice(100);
    var nowLen = oliArr.length;
    var d = document.querySelectorAll('li div');    
    for(var i = 0; i < nowLen; i++){
        // var l = li[i];
        li[i].style.width = width + 'px';
        var oD = Array.prototype.slice.call(d).splice(i*4,4);
        for(var j = 0; j < 4; j++){
            oD[j].style.backgroundPositionX = -i * width + 'px';
        }
        // 转动
        turn()
        bindEvent()
    }
}
function bindEvent() {
    var len = olLi.length;
    // for(let i = 0; i < len; i++) {
    //     olLi[i].onclick
    // }
    ol.onmouseenter = function(){
        clearInterval(timer)
        this.onmouseleave = function () {
            turn();
        }
    }
    oUl.onmouseenter = function (e) {
        clearInterval(timer);
        ol.onclick = function (e) {
            for(let i = 0; i < len; i++){
                if(olLi[i] == e.target) {
                    var d = i - lastIndex -1;
                    lastIndex = i - 1;
                    n += d;
                    turn(true);
                    console.log(i,n)
                    break;
                }
            }
        }
    }
    oUl.onmouseleave = function () {
        turn()
    }
    
}
function turn(flag) {
    var len = oliArr.length;
    var index = 0;
    clearInterval(timer);
    timer = setInterval(function(){
        if(flag){
            clearInterval(timer)
        }
        for(var i = 0; i < 4; i++){
            olLi[i].classList.remove('on')
        }
        n++;        
        index = n%4;
        lastIndex = index;
        olLi[index].classList.add('on');        
        for(var i = 0; i < len; i++){
            oliArr[i].style.transform = 'rotateX(-'+ n*90 + 'deg)';
            oliArr[i].style.transition = 'transform 0.3s ease-in-out ' + i*0.3/len + 's';
        }
    },2000)
}