var $bang = $('.bang', '.bang-wrapper');
var $block = $('.block', '.bang-wrapper');
var $timeNum = $('.time-setNum', '.bang-wrapper');
var $start = $('.startGame');
var bangArr = [];
var numArr = [];
var blockArr = [];
var timer = null;
var Flag = false;
var sliderNum;
var allBang;
var newArr;


$start.on('click', function () {
    if (Flag) {
        randerBang()
    }
    bindEvent();
    var add = 0;
    sliderNum = 0;
    $(this).css({
        'display': 'none'
    })
    $timeNum.find('.time').find('span').text(0);
    $timeNum.find('.slider-num').find('span').text(10);
    timer = setInterval(function () {
        add++;
        $timeNum.find('.time').find('span').text(add);
    }, 1000)
})
// 添加雷盘；
function randerBang() {
    Flag = true;
    var bangStr = '';
    allBang = 9 * 9;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var num1 = i * 9 + j;
            bangArr.push(num1);
            blockArr.push(num1);
            bangStr += '<li></li>';
        }
    }
    $bang.html(bangStr);
    $block.html(bangStr);
    randomBang();
    var blockWidth = parseFloat($block.find('li').css('width'));
    var blockHeight = parseFloat($block.find('li').css('height'));
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var num2 = i * 9 + j;
            $block.find('li').eq(num2).css({
                'top': i * blockWidth + 'px',
                'left': j * blockHeight + 'px'
            })
        }
    }
}
randerBang()
function randomBang() {
    newArr = [];
    var len = bangArr.length;
    for (var i = 0; i < 10; i++) {
        var bangNum = Math.floor(Math.random() * 9 * 9);
        while ($.inArray(bangNum, newArr) > -1) {
            bangNum = Math.floor(Math.random() * 9 * 9);
        }
        newArr.push(bangNum);
    }
    for (var i = 0; i < 10; i++) {
        $bang.find('li').eq(newArr[i]).html('雷').addClass('bang-block');
        $block.find('li').eq(newArr[i]).addClass('block-bang');
    }
    randerNum(newArr);
}
function randerNum(arrayList) {
    for (var i = 0; i < 10; i++) {
        var x = Math.floor(arrayList[i] / 9);
        var y = arrayList[i] % 9;
        if (x - 1 >= 0) {
            changeNum(x - 1, y);
        };
        if (x + 1 < 9) {
            changeNum(x + 1, y);
        };
        if (y - 1 >= 0) {
            changeNum(x, y - 1);
        };
        if (y + 1 < 9) {
            changeNum(x, y + 1);
        };
        if (x - 1 >= 0 && y - 1 >= 0) {
            changeNum(x - 1, y - 1);
        };
        if (x - 1 >= 0 && y + 1 < 9) {
            changeNum(x - 1, y + 1);
        };
        if (x + 1 < 9 && y + 1 < 9) {
            changeNum(x + 1, y + 1);
        };
        if (x + 1 < 9 && y - 1 >= 0) {
            changeNum(x + 1, y - 1);
        }
    }
}
function changeNum(numX, numY) {
    var num = numX * 9 + numY;
    var $li = $bang.find('li').eq(num);
    var $blockLi = $block.find('li').eq(num);
    if (!$li.hasClass('bang-block')) {
        // $li.addClass('bang-num');
        $blockLi.addClass('block-num');
        if ($.inArray(num, numArr) < 0) {
            numArr.push(num);
        };
        if ($li.text() === "") {
            $li.text(1);
        } else {
            var text = parseInt($li.text());
            text++;
            $li.text(text);
        }
    }
}
function bindEvent() {
    $(document).ready(function () {
        $(document).bind("contextmenu", function (e) {
            if (typeof e.preventDefault === "function") {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        });
    });
    $block.on('mousedown', 'li', function (e) {
        var _this = $(this);
        var index = _this.index();
        var x = parseInt(index / 9);
        var y = index % 9;
        if (e.which == 1) {
            if (_this.attr('data')) {
                return false;
            };
            openBlock(x, y);
        } else if (e.which == 3) {
            if (_this.attr('data') == undefined) {
                _this.attr('data', 0);
                sliderNum--;
                var slider = 10 + sliderNum;
                $timeNum.find('.slider-num').find('span').text(slider);
            } else {
                var data = parseInt(_this.attr('data'));
                data++;
                _this.attr('data', data);
            }
            var blockData = parseInt(_this.attr('data'));
            blockData++;
            if (blockData % 3 == 1) {
                _this.text('旗');
            } else if (blockData % 3 == 2) {
                _this.text('?');
                sliderNum++;
                var slider = 10 + sliderNum;
                $timeNum.find('.slider-num').find('span').text(slider);
            } else if (blockData % 3 == 0) {
                _this.text("").removeAttr('data');
            }
        }
    })
}
function openBlock(x, y, flag) {
    var checkNum = x * 9 + y;
    var $li = $block.find('li').eq(checkNum);
    if (flag) {
        if ($li.hasClass('block-num') && !$li.hasClass('none')) {
            $li.css({
                'display': 'none'
            }).addClass('none'); 
            allBang--;               
        }
    } else {
        if ($li.hasClass('block-num') && !$li.hasClass('none')) {
            $li.css({
                'display': 'none'
            }).addClass('none');
            allBang--;
        } else if ($li.hasClass('block-bang')) {
            clearInterval(timer);
            $block.off('mousedown');
            $start.css({
                'display': 'block'
            })
            $timeNum.find('.time').find('span').text(0);
            alert('很不幸，你点中了雷，游戏失败！请重新开始游戏。')
            for (var i = 0; i < 10; i++) {
                $block.find('li').eq(newArr[i]).css({
                    'display': 'none'
                });
            }
        } else if (!$li.hasClass('none')) {
            $li.css({
                'display': 'none'
            }).addClass('none');
            allBang--;
            if (x - 1 >= 0) {
                openBlock(x - 1, y);
            };
            if (x + 1 < 9) {
                openBlock(x + 1, y);
            };
            if (y - 1 >= 0) {
                openBlock(x, y - 1);
            };
            if (y + 1 < 9) {
                openBlock(x, y + 1);
            };
            if (x - 1 >= 0 && y - 1 >= 0) {
                openBlock(x - 1, y - 1, true);
            };
            if (x - 1 >= 0 && y + 1 < 9) {
                openBlock(x - 1, y + 1, true);
            };
            if (x + 1 < 9 && y + 1 < 9) {
                openBlock(x + 1, y + 1, true);
            };
            if (x + 1 < 9 && y - 1 >= 0) {
                openBlock(x + 1, y - 1, true);
            }
        }
    }
    if (allBang == 10) {
        clearInterval(timer);
        $block.off('mousedown');
        $start.css({
            'display': 'block'
        })
        for (var i = 0; i < 10; i++) {
            $block.find('li').eq(newArr[i]).css({
                'display': 'none'
            });
        }
        alert('恭喜你顺利通过了游戏；再来一局吧！！！');
    }
}