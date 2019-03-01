var Time = {
    // 获得现在的事件
    getUnix(){
        var date = new Date();
        return date.getTime();
    },
    // 获得今天0点的时间
    getTodayUnix(){
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获得这一年一月一日的0点的时间
    getYearUnix(){
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        date.getTime()
    },
    // 为时间太长做准备 直接将此返回
    getLastDate(time){
        var date = new Date(time);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    },
    // 获取时间戳
    getFormatTime(timetamp){
        // 获取现在的时间 拿现在的时间和传过来的时间作对比 已确定相隔多长时间
        var now = this.getUnix();
        var today = this.getTodayUnix();
        var year = this.getYearUnix();
        var timer = (now - timetamp)/1000;
        var tip = "";

        if(timer <= 0 || timer < 60){
            tip = '刚刚';
        }else if(timer < 3600){
            tip = Math.floor(timer / 60) + '分钟前';
        }else if(timer >= 3600 && timer - today > 0){
            tip = Math.floor(timer / 3600) + '小时前'
        }else if(timer / (3600 * 24) < 31){
            tip = Math.floor(timer / (3600 *24)) + '天前'
        }else{
            tip = this.getLastDate(timetamp);
        }
        return tip;
    }
}

export default {
    bind(el,binding){
        el.innerHTML = Time.getFormatTime(binding.value * 1000);
        el._timeout_ = setInterval(() => {
            el.innerHTML = Time.getFormatTime(binding.value * 1000);
        },60000)
    },
    unbind(el){
        clearInterval(el._timeout_);
        delete el._timeout_;
    }
}