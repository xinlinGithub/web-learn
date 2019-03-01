$(function(){
    var box = $('.menu .box');
    $('.menu').hover(function(){
        box.stop().show(300)
    },function(){
        box.stop().hide(300)
    })
})