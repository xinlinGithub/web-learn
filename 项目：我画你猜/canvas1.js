// 用对象的方式写

var drawingLinObj = {
    cavs: $('.cavs'),
    context: $('.cavs').get(0).getContext('2d'),//get将原生dom转化成js...
    colorBoard: $('#colorBoard'),
    ret: $('#ret'),
    eraser: $('#eraser'),
    clear: $('#clear'),
    line: $('#line'),
    bool: false,
    clearBool: false,
    flag: false,
    arrImg: [],
    w: 50,
    h: 50,
    init: function () {
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.btn();
    },
    draw: function () {
        var cavs = this.cavs,
            self = this;
        var c_x = cavs.offset().left;
        var c_y = cavs.offset().top;
        cavs.mousedown(function(e){
            if(self.clearBool == true){
                return false;
            }
            self.bool = true;
            var ctx = self.context;
            var m_x = e.pageX - c_x;
            var m_y = e.pageY - c_y;
            ctx.beginPath();
            ctx.moveTo(m_x,m_y);
            cavs.mousemove(function(e){
                if(self.bool){
                    ctx.lineTo(e.pageX - c_x,e.pageY - c_y);
                    ctx.stroke();
                }
            })
            cavs.mouseup(function(){
                self.bool = false;
            })
            cavs.mouseleave(function(){
                ctx.closePath();
                // self.bool = false;                
            })

            var imageData = ctx.getImageData(0,0,self.cavs[0].width,self.cavs[0].height);
            self.arrImg.push(imageData);
            // 在此次的绘画中，开始时，会保存上一步，最后撤销的时候，再把上一步剪切出来，渲染到画布中即可；
            console.log(self.arrImg.length);
        })
    },
    btn: function(){
        var self = this;
        $('.btn-list').on('click',function(e){
            var e = e || window.event;
            switch(e.target.id){
                case 'eraser': 
                    self.exchange(e);
                break;
                case 'clear':
                    self.context.clearRect(0,0,self.cavs[0].width,self.cavs[0].height);
                    self.arrImg = [];
                break;
                case 'ret':
                    if(self.arrImg.length > 0){
                        self.context.putImageData(self.arrImg.pop(),0,0);
                    }
                break;
                case 'add':
                    self.w += 2;
                    self.h += 2;
                break;
                case 'dic':
                    self.w -= 2;
                    self.h -= 2;
                break;
            }
        })
        this.colorBoard.change(function(e){// 改变字体颜色；
            self.context.strokeStyle = $(this).val();
        })
        this.line.change(function(e){
            self.context.lineWidth = $(this).val();
        })
    },
    clear: function(){
        var self = this;
        var ctx = self.context;
        var cavs = self.cavs;
        self.clearBool = true; 
        cavs.mousedown(function(e){
            self.flag = true;
            var c_x = cavs.offset().left;
            var c_y = cavs.offset().top;
            cavs.mousemove(function(e){
                if(self.clearBool == false){
                    return false;
                }
                if(self.flag == false){
                    return false;
                }
                var m_x = e.pageX - c_x;
                var m_y = e.pageY - c_y;
                var x_top = m_x - self.w/2;
                var y_top = m_y -self.h/2;                
                ctx.clearRect(x_top,y_top,self.w,self.h);
            })
            cavs.mouseup(function(){
                self.flag = false;
            })
            var imageData = ctx.getImageData(0,0,self.cavs[0].width,self.cavs[0].height);
            self.arrImg.push(imageData);
            console.log(self.arrImg.length)
        })
    },
    exchange: function (e) {
        var self = this;
        if(e.target.value == "绘画"){
            self.clearBool = false;                            
            self.draw();            
            e.target.value = "橡皮";
        }else{
            self.clear();
            e.target.value = "绘画"
        }
    }
}
drawingLinObj.init()