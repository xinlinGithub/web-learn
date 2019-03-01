$(function(){
    var boxDom = $('#boxDom');
    var top, right;
    var pageWidth = parseInt($(document).width());
    var pageHeight = parseInt($(document).height());
    $('#btn').bind("click",auto);
    document.onkeydown = function () {
        if(event.keyCode == 13) {
            auto();
        }
    }
    function auto() {
        var str = $('.text').val();
        str = getLen(str);
        var createSpan = $('<span class = "string"></span>');
        createSpan.text(str);
        $('.text').val("");
        var preTop = Math.random() * pageHeight * 0.5;
        top = Math.floor(preTop);
        createSpan.css({"top": top,"right": -400,"color": getRandomColor()})
        boxDom.append(createSpan);
        var spanDom = $("#boxDom>span:last-child");
        spanDom.animate({
            "right": pageWidth + 300
        },10000,function(){
            $(this).remove()
        })
    } 
    function getRandomColor() {
        var colorArr = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E'];
        var color = "";
        for(var i = 0; i < 6; i++) {
            color += colorArr[Math.floor(Math.random()*15)]
        }
        return "#" + color;
    }
    function getLen(strg) {
        var len = strg.length;
        var count = 0;
        var newArr = '';
        if(len > 60) {
            var arr1 = strg.split('');
                arr1.splice(100,1000000000,'');
                strg = arr1.join('');
                len = 60;
        }
        for(var i = 0; i < len; i++) {
            if(strg.charAt(i) == ' '){
                count = 0;
            }else {
                strg.charCodeAt(i) > 255 ? count += 2 : count += 1;  
            }
            newArr = strg;                                          
            if(count % 20 === 0 && count != 0){
                var arr = strg.split('');
                arr.splice(i+1,0,' ');
                newArr = arr.join('')
                strg = newArr;
                len = strg.length;
            }
        }
        return newArr;
    }
})