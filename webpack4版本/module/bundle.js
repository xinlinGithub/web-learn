(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// 主文件入口 引入被当做模块的js文件
var m1 = require('./modules/m1')//不用加js后缀;
var m2 = require('./modules/m2');
var m3 = require('./modules/m3')

m1.foo();
m2();
m3.foo()
// 在node环境下执行 node main.js
},{"./modules/m1":2,"./modules/m2":3,"./modules/m3":4}],2:[function(require,module,exports){
// module.exports = value;
// exports.val = value;
// 以上两种方法暴露模块 exports本质是一个空对象 这是CommonJs规范

module.exports = {
    msg: 'm1',
    foo(){
        console.log(this.msg)
    }
}
},{}],3:[function(require,module,exports){
module.exports = function () {
    console.log('m2')
}
},{}],4:[function(require,module,exports){
module.exports.foo = function() {
    console.log('m3')
}
},{}]},{},[1]);
