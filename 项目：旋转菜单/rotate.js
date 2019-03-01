var $li = $('.selector li');//选中的为原生的dom 下面再用的话还得重新选；
// console.log($li)
var $sel = $('.selector')
var len = $li.length;

$('.selector button').on('click',function () {
    change();
})
function change() {
    $sel.toggleClass('open');
    var deg = 360 / len;     
    for(var i = 0; i < len; i++){
        var d = i * deg;
        $sel.hasClass('open') ? rotate($li[i], d) : rotate($li[i], -360);
        //没有open时旋转-360 并不是为了还原 只是为了有个过度的效果；
    }
}
function rotate(ele,de) {
    $(ele).css({
        transform: 'rotateZ(' + de +'deg)'
    }).find('label').css({
        transform: 'rotateZ('+ (-de) +'deg)'
    })
}
setTimeout(() => {
    change();
}, 100);