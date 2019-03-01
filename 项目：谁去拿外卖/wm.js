(function () {
    var button = document.getElementsByTagName('button')[0];
    var close = document.getElementsByClassName('close')[0];
    var mask = document.getElementsByClassName('mask')[0];
    var logobtn = document.getElementsByClassName('logo')[0];    
    var arrlist = [];
    var min,index;
    var ullist = document.getElementsByTagName('ul')[0];
    close.onclick = function () {
        mask.style.display = 'none';
        ullist.innerHTML = '';
        arrlist = [];
        // mask.show();
    }
    logobtn.onclick = function () {
        mask.style.display = 'block';
    }
    button.onmouseenter = function () {
        this.style.backgroundPosition = '0 ' + (-40) +'px';
        this.onmouseleave = function () {
            this.style.backgroundPosition = '0 ' + 0 + 'px';
        }
    }
    button.onmousedown = function () {
        this.style.backgroundPosition = '0 ' + (-80) + 'px';
        createNum();
        this.onmouseup = function () {
            this.style.backgroundPosition = '0 ' + (-40) + 'px';
        }
    }
    function createNum() {
        var num = Math.floor((Math.random() * 9 +1) * 10);
        if(min == num){
            createNum();
            return false;
        }
        if(arrlist.length > 9) {
            if(num > min && index == 0){
                arrlist.splice(1,1);
            }else{
                arrlist.shift();
            }
        }
        arrlist.push(num);
        min = arrlist.min();
        index = arrlist.indexOf(min);
        console.log(arrlist);
        refurbishDom(arrlist,index);
    }
    function refurbishDom(arr,index) {
        var len = arr.length;
        ullist.innerHTML = '';
        for(var i = 0; i < len; i++) {
            ullist.innerHTML += '<li>'+ '扔出了一个'+arr[i]+'</li>';
        }
        ullist.getElementsByTagName('li')[index].className = 'takeout-list'
        // console.log(arr.min())
    }
    Array.prototype.min = function () {
        var min = this[0];
        var len = this.length;
        for(var i = 1; i < len; i++){
            if(this[i] < min){
                min = this[i];
            }
        }
        return min;
    }
})()
// 封装成一个功能