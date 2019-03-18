// 一些公共方法 单独放到一个文件夹下

var tool = {
    inherit: function (target, origin) {
        // 实现原型继承 圣杯模式
        var temp = function () {};
        temp.prototype = origin.prototype;//继承原型
        target.prototype = new temp();
        target.prototype.constructor = target;
    },
    // 继承私有属性 再写一个继承 单一职责
    extends: function (origin) {
        // 直接返回一个构造函数
        // 继承私有
        var result = function () {
            var args = [].slice.call(arguments);
            origin.apply(this, args);
        };
        // 继承公有
        this.inherit(result, origin);
        return result;
    },
    // 将一个函数创建成单例
    single: function (origin) {
        var singleResult = (function () {
            var instance = null;
            return function () {
                var args = [].slice.call(arguments);
                if(instance !== null) {
                    return instance;
                }
                instance = this;
                // 使当前作用域中的this继承origin的私有属性 最后返回instance
                origin && origin.apply(this, args);
                return instance;
            }
        })();
        // 返回出的新函数继承 origin的原型 这样即变成单例 又不失功能
        origin && this.inherit(singleResult, origin);
        return singleResult;
    },
    throttle: function (fn, wait) {
        // 将一个函数变成节流的函数 在改变蛇的运动方向时 防止在短时间内多次点击按钮 就是一段时间只能触发一次
        var lastTime = 0;
        var curTime;
        return function (e) {
            curTime = +new Date()
            if(curTime - lastTime >= wait) {
                fn.apply(this, arguments);
                lastTime = curTime;
            }
        }
    }
}



