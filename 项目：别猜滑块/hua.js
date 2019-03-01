function Demo() {
    var speed = 5;
    this.dom = {
        $start: $('.start'),
        $href: $('a'),
        $main: $('.main')
    }
    this.speed = speed;
    this.init();
    this.arrColor = ['red','orange','green','blue'];
}
Demo.prototype.init = function () {
    this.bindEvent();
}
Demo.prototype.bindEvent = function () {
    var num = 0;
    var self = this;
    self.num = num;        
    var main = self.dom.$main
    self.dom.$start.on('click', function () {
        $(this).css({
            'display': 'none'
        });
        main.css('z-index',22)
        self.move();
    })
    main.on('click',function (e) {
        var e = e || window.event;
        var target = e.target;
        if(target.className =='i'){
            self.num++;
            target.className = "";
            target.style.background = '#666'
            if(self.num %  10 == 0){
                self.speed++;
            }
        }else{
            alert('游戏失败！！！ 得分为:' + self.num)
            clearInterval(self.timer)
            main.css({
                'top': '-150px'
            })
            main.off('click');
        }
    })
}
Demo.prototype.move = function () {
    var self = this;
    var main = self.dom.$main;
    self.getRow()    
    self.timer = setInterval(function () {
        main.css({
            'top': parseInt(main.css('top')) + self.speed + 'px'
        })
        if(parseInt(main.css('top')) >= 0){
            self.getRow()
        }
        var len = main.children().length;
        if(len == 6){
            for(var i = 0; i < 4; i++){
                if(main.children()[len -1].children[i].className == 'i'){
                    alert('游戏失败！！！得分为:' + self.num)
                    clearInterval(self.timer)
                    main.css({
                        'top': '-150px'
                    })
                    main.off('click');
                    return false;
                }
            }
            $(main.children()[len-1]).remove();
        }
    },30)
    
}
Demo.prototype.getRow = function () {
    var self = this;
    var row = $('<div></div>').attr('class','row');
    var main = self.dom.$main;
    var random = Math.floor(Math.random() * 4);
    row.css({
        'width': '400px',
        'height': '150px'
    })
    for(var i = 0; i < 4; i++){
        var div = $('<div></div>');
        row.append(div);
    }
    row.find('div').eq(random).css({
        'background': self.arrColor[random]
    }).addClass('i');
    if(main.children().length == 0){
        main.append(row)
    }else{
        row.insertBefore(main.children()[0])
    } 
    main.css({
        'top': '-150px'
    })
}
new Demo()