// 递归中常用 就是使用上一步的结果 防止重复计算 浪费性能

// var lastTime = new Date().getTime();
var num = 0;
var cache = [];// 但这种在全局做一个缓存不好 有可能被更改 最好在内部做
function jieC(n) {
    if(cache[n]){
        //做一个缓存 可以存储以前已经算过的结果 避免重复计算 
        // 可以在操作大数据时实现一种优化
        return cache[n];
    }
    num++;
    if(n === 1 || n === 0) {
        cache[n] = 1;
        return 1;
    }else {
        return cache[n] = n * jieC(n-1);
    }
}
// var result = jieC(10);
// console.log(num, result)

// var increase = 0;
// for(var i = 1; i <= 50; i++) {
//     increase += jieC(i);
// }
// console.log(increase, num);



// new Promise((resolve, reject) => {
//     console.log(lastTime)
//     var result = jieC(200);
//     resolve(result);
// }).then(time => {
//     var curTime = new Date().getTime();
//     console.log(curTime);
//     console.log(time, curTime - lastTime);
// })


// 优化函数记忆功能

function jieC1(n) {
    if(n === 1 || n === 0) {
        return 1;
    }else {
        return n * jieC1(n-1);
    }
}
function memorize(fn) {
    var cache = {};
    // 用闭包的形式返回
    var newJieC = function () {
        // 唯一标识的key值
        var key = arguments.length + Array.prototype.join.call(arguments);
        if(cache[key]) {
            return cache[key];
        }else {
            cache[key] = fn.apply(this, arguments);
             return cache[key];
        }
    }
    return newJieC
}

// 返回的函数和先前的函数功能还是一样的 只不过计算完一遍值后 就具有了记忆功能
var neJieC = memorize(jieC1);

// console.time("no M");
// console.log(jieC1(10));
// console.timeEnd("no M")

// console.time("one M");
// console.log(neJieC(10));
// console.timeEnd("one M")

// console.time("two M");
// console.log(neJieC(10));
// console.timeEnd("two M")

// 执行完后就会有记忆
// console.time("count1 M");
// var count = 0;
// for(var i = 1; i <= 10; i++) {
//     count += neJieC(i);
// }
// console.log(count);
// console.timeEnd("count1 M")

// // 直接拿记忆中的值
// console.time("count2 M");
// var count1 = 0;
// for(var i = 1; i <= 10; i++) {
//     count1 += neJieC(i);
// }
// console.log(count1);
// console.timeEnd("count2 M")

// 上面的函数只能对整体记忆不能对每一步记忆 可以再次改写一下
// 这样记忆就比较明显 可以明确记忆每一次递归
function retJieC () {
    var cache = [];
    var tempJieC = function (arg) {
        if(cache[arg]) {
            return cache[arg];
        }
        if(arg === 1 || arg === 0) {
            return cache[arg] = 1;
        }else {
            return cache[arg] = arg * tempJieC(arg - 1);
        }
    }
    return tempJieC;
}

var myJieC = retJieC();


// console.time("jieC1")
// console.log(jieC1(10));
// console.timeEnd("jieC1");

// console.time("myJieC")
// console.log(myJieC(10));
// console.timeEnd("myJieC")

// 下面的会更明显
console.time("jieCount");
var jieCount = 0;
for(var i = 1; i <= 100; i++) {
    jieCount += jieC1(i);
}
console.log(jieCount);
console.timeEnd("jieCount");

console.time("jieCount1");
var jieCount1 = 0;
for(var i = 1; i <= 100; i++) {
    jieCount1 += myJieC(i);
}
console.log(jieCount1);
console.timeEnd("jieCount1");