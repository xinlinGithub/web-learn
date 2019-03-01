// 实现插件 +实现轮播功能
// $.fn.extend(方便 可压缩 加到实例上)  $.extend(加到工具方法上)

(function($){
    function Slider(ele, opt) {
        // 接受参数 1：那个元素操作的此插件 2：想让该插件怎样运行
        // 准备默认参数 防止没传参
        var d = {
            curDisplay: 0,//初始图片
            autoPlay: false,// 是否自动轮播
            interval: 500//间隔时间
        }
        this.opts = $.extend({},d,opt);// 将两者合并 若传参了 就用参数 没传就用默认；
        this.wrap = ele;
        this.curDisplay = this.opts.curDisplay;
        this.$img = this.wrap.find('img');
        this.imgLen = this.$img.length;
        this.nowIndex = 0;
        this.autoPlay = this.opts.autoPlay;
        this.timer = null;
        this.interval = this.opts.interval;
        this.init();
    }
    Slider.prototype.init = function () {
        console.log(this);
        this.initMove();//自动播放
        this.bindEvent();//点击切换
    }
    Slider.prototype.initMove = function () {
        var self = this;
        var len = Math.floor(self.imgLen / 2);
        var lNum, rNum;
        for(var i = 0; i < len; i++){
            lNum = self.curDisplay - i -1;
            self.$img.eq(lNum).css({
                transform: 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(30deg)'
                // 每一次改transform都是在最初的基础上改 而不是上一次 所以他就把上一次的给覆盖了；
            })
            rNum = self.curDisplay + i + 1;
            if(rNum > self.imgLen - 1){
                rNum = rNum - self.imgLen;
            }
            self.$img.eq(rNum).css({
                transform: 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(-30deg)'
            })
        }
        self.$img.eq(self.curDisplay).css({
            transform: 'translateZ(300px)'
        })
    }
    Slider.prototype.bindEvent = function () {
        var self = this;
        self.$img.on('click',function () {
            self.nowIndex = $(this).index();
            console.log(self.nowIndex)
            self.moving(self.nowIndex)
        }).hover(function(){
            clearInterval(self.timer)
        },function(){
            self.timer = setInterval(function(){
                self.play();
            },self.interval)
        })
        self.timer = setInterval(function(){
            self.play();
        },self.interval)
    }
    Slider.prototype.moving = function (index) {
        this.curDisplay = index;
        this.initMove();
    }
    Slider.prototype.play = function () {
        if(this.autoPlay === true){
            if(this.nowIndex == this.imgLen - 1){
                this.nowIndex = 0;
            }else{
                this.nowIndex++;
            }
            this.moving(this.nowIndex);
        }
    }
    $.fn.extend({
        slider: function(options){
            new Slider(this, options);//this 指操作对象
        }
    })

})(jQuery)