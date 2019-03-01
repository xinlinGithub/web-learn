var oStart = $('.start');
var oBox = $('.box');
var imageArr = [];
var imageRanArr = [];
var cellList;
var flag = true;
var cellH,cellW;

// 通用性较高；可随意改变难度
init(4,4)
function init(x,y) {
    proCell(x,y);
    startGame(x,y);
}
function proCell(cellX,cellY) {
    for(var i = 0; i < cellY; i++){
        for(var j = 0; j < cellX; j++){
            imageArr.push(i*cellX + j);
            var oCell = $('<div></div>');
            $(oCell).attr('class','cell');
            cellH = parseInt(parseInt(oBox.css('height'))/cellY);
            cellW = parseInt(parseInt(oBox.css('width'))/cellX);
            $(oCell).css({
                'background' : "url('./chen.jpg')",
                'backgroundSize' : cellX*100 + '% ' + cellY*100 + '%',
                'background-repeat' : 'no-repeat',
                'width' : cellW + 'px',
                'height' : cellH + 'px',
                'left' : j * cellW + 'px',
                'top' : i * cellH + 'px',
                'backgroundPosition' : -j*cellW + 'px ' + -i*cellH + 'px'
            })
            oBox.append(oCell);
        }
    }
    cellList = $('.cell');
}
function startGame(cX,cY) {
    oStart.on('click',function () {
        if(flag){
            flag = false;
            $(this).text('复原');
            changeImageArr(cX,cY);
            turnPic(cX,cY);
            cellList.css({
                'cursor' : 'pointer'
            }).on('mouseover',function () {
                $(this).addClass('hover');
            }).on('mouseout',function () {
                $(this).removeClass('hover');
            }).on('mousedown',function (e) {
                var index = $(this).index();
                var cellX = e.pageX - $(this).offset().left;
                var cellY = e.pageY - $(this).offset().top;
                $(document).on('mousemove',function (e1) {
                    var cellMoveX = e1.pageX - cellX - oBox.offset().left;
                    var cellMoveY = e1.pageY - cellY - oBox.offset().top;
                    cellList.eq(index).css({
                        'left' : cellMoveX + 'px',
                        'top' : cellMoveY + 'px',
                        'cursor' : 'move',
                        'z-index' : '80'
                    })
                }).on('mouseup',function (e2) {
                    var ranX = e2.pageX - oBox.offset().left;
                    var ranY = e2.pageY - oBox.offset().top;
                    var newIndex = checkIndex(ranX,ranY,index,cX,cY);
                    if(index == newIndex){
                        cellList.eq(index).animate({
                            'left' : (imageRanArr[index] % cX) *cellW + 'px',
                            'top' : Math.floor(imageRanArr[index] / cX) *cellH + 'px'
                        },200,function () {
                            $(this).css('z-index','10');
                            $(document).off('mousemove').off('mouseup');
                        })
                    }else{
                        changeIndex(index,newIndex,cX,cY);
                    }
                })
            })
        }else{
            flag = true;
            reImage(cX,cY);
            $(this).text('开始');
        }
    })
}
function changeImageArr(cX,cY) {
    imageRanArr = [];
    for(var i = 0; i < imageArr.length; i++){
        var numArr = Math.floor(Math.random()*cX*cY);
        if(imageRanArr.length > 0){
            while($.inArray(numArr,imageRanArr) > -1){
                numArr = Math.floor(Math.random()*cX*cY);
            }
        }
        imageRanArr.push(numArr);
    }
}
function turnPic(cX,cY) {
    for(var i = 0; i < imageRanArr.length; i++){
        var Left = imageRanArr[i] % cX;
        var Top = Math.floor(imageRanArr[i] / cX);
        cellList.eq(i).animate({
            'z-index' : 10,
            'left' : Left*cellW + 'px',
            'top' : Top*cellH + 'px'
        },400)
    }
}
function reImage(cX,cY) {
    for(var i = 0; i < imageArr.length; i++) {
        var Left = imageArr[i] % cX;
        var Top = Math.floor(imageArr[i] / cX);
        cellList.eq(i).animate({
            'left' : Left*cellW + 'px',
            'top' : Top*cellH + 'px'
        },400,function () {
            $(this).css('z-index' , '10')
        }).off('mouseover').off('mouseout').off('mousedown');
    }
}
function checkIndex(pageX,pageY,index,cX,cY){
    if(pageX < 0 || pageY < 0 || pageX >cellW*cX || pageY > cellH*cY){
        return index;
    }else{
        var pLeft = Math.floor(pageX/cellW);
        var pTop = Math.floor(pageY/cellH);
        position = pTop * cX +pLeft;
        var i = 0;
        while(i < imageRanArr.length && imageRanArr[i] != position) {
            i++;
        }
        return i;
    }
}
function changeIndex(from,to,cX,cY){
    var frowX = imageRanArr[from] % cX;
    var fcolY = Math.floor(imageRanArr[from] / cX);
    var trowX = imageRanArr[to] % cX;
    var tcolY = Math.floor(imageRanArr[to] / cX);
    var t = imageRanArr[from];
    imageRanArr[from] = imageRanArr[to];
    imageRanArr[to] = t;
    cellList.eq(from).animate({
        'top' : tcolY*cellH+ 'px',
        'left' : trowX*cellW + 'px'
    },200,function () {
        $(this).css('z-index','10')
        $(document).off('mousemove').off('mouseup');
    })
    cellList.eq(to).animate({
        'top' : fcolY *cellH+ 'px',
        'left' : frowX*cellW + 'px'
    },200,function () {
        $(this).css('z-index','10')
        $(document).off('mousemove').off('mouseup');
        if(imageRanArr.toString() == imageArr.toString()) {
            success()
        } 
    }) 
}
function success() {
    for(var i = 0; i < imageArr.length; i++){
        if(cellList.eq(i).has('hover')){
            cellList.eq(i).removeClass('hover');
        }
    }
    oStart.text('开始');
    cellList.css('cursor','default').off('mouseover').off('mouseout').off('mousedown')
    alert('you are right!')
}