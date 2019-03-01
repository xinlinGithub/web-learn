function Index(num) {
    this.dom = {
        $wrap: $('.wrapper'),
        $imgCov: $('.imgCov'),
        $moveView: $('.moveView'),
        $bottImg: $('.bottomImg'),
        $bigView: $('.bigView'),
        $con: $('.content')
    }
    this.mul = num;
    this.init();
}

Index.prototype.init = function () {
    this.bindEvent();
    this.createView();
}
Index.prototype.createView = function () {
    this.moveWidth = 500 / this.mul;
    var width = this.moveWidth;
    this.dom.$moveView.css({
        'width' : width + 'px',
        'height' : width + 'px'
    })
}
Index.prototype.getIndex = function (index) {
    var self = this;
    var img = new Image();
    var ul = self.dom.$bottImg.find('ul');
    var src = ul.find('img').eq(index).attr('src');
    ul.find('div').removeClass('active').eq(index).addClass('active');
    img.src = src;
    var w = img.width,
        h = img.height,
        styleCss,
        str = '';
    if(w > h) {
        self.imgWidth = 500;
        self.imgHeight = h / w * 500;
        style = `top: 50%; margin-top: -${self.imgHeight/2}px`
    }else{
        self.imgHeight = 500;
        self.imgWidth = w / h * 500;
        style = `left: 50%; margin-left: -${self.imgWidth/2}px`        
    }
    
    str = `<img src="${src}" width=${self.imgWidth} height=${self.imgHeight} style="${style}"></img>`
    self.dom.$imgCov.empty().html(str);
    self.dom.$bigView.empty().html(`<img src="${src}" width=${self.imgWidth*self.mul} height=${self.imgHeight*self.mul}></img>`);
}
Index.prototype.move = function (e) {
    var self = this;
    var minX = (500 - self.imgWidth) / 2,
        maxX = 500 - minX - self.moveWidth,
        minY = (500 - self.imgHeight) / 2,
        maxY = 500 - minY - self.moveWidth;
    var endX,endY;
    var x = e.pageX - self.dom.$imgCov.offset().left - self.moveWidth / 2,
        y = e.pageY - self.dom.$imgCov.offset().top - self.moveWidth / 2;
        endX = x > minX ? x < maxX ? x : maxX : minX;
        endY = y > minY ? y < maxY ? y : maxY : minY;
    self.dom.$moveView.css({
        'display' : 'block',
        'top' : endY + 'px',
        'left' : endX + 'px'
    })
    var posX = (endX - minX) * self.mul,
        posY = (endY - minY) * self.mul;
    self.dom.$bigView.css({
        'display' : 'block'
    }).find('img').css({
        'top' : -posY + 'px',
        'left' : -posX + 'px'
    })
}
Index.prototype.bindEvent = function () {
    var self = this,
        index;
    self.getIndex(0);
    var ul = self.dom.$bottImg.find('ul');
    ul.find('li').on('click',function () {
        index = $(this).index();
        self.getIndex(index);
    })   
    self.dom.$con.on('mousemove',function (e) {
        self.move(e);
    }).on('mouseleave',function () {
        self.dom.$moveView.hide();
        self.dom.$bigView.hide();
    })
}


new Index(2);

