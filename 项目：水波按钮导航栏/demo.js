var oUl = document.getElementsByClassName('wrapper')[0];
var title = document.getElementsByClassName('title');
var item = document.getElementsByClassName('item');
var slider = document.getElementsByClassName('slider')[0]
var active = document.getElementsByClassName('active')[0]
var oSpan = document.createElement('span');
oSpan.className = 'ribble'


oUl.addEventListener('click',function(e){
    var target = e.target;
    var index;
    var left, top;
    active.classList.remove('active')
    if(target.nodeName == 'A'){
        index = findIndex(title, target);
        slider.style.left = index * slider.offsetWidth + 'px';
        left = e.offsetX;
        top = e.offsetY;
        target.appendChild(oSpan);         
        oSpan.style.left = -80 + left  + 'px';
        oSpan.style.top = -80 + top + 'px';
        // target.getBoundingClientRect() 获取视图集合 返回一个对象 可打印看看
        // for(var i = 0; i < item.length; i++){
        //     item[i].classList.remove('active')
        // }
        item[index].classList.add('active');
        active = item[index];
    }
})
function findIndex(list, target) {
    // typeof Array.prototype.slice.call(list) 将类数组转变成数组
    for(var i = 0; i < list.length; i++) {
        if(target == list[i]){
            return i
        }
    }
}