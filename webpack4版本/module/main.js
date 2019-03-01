// 主文件入口 引入被当做模块的js文件
var m1 = require('./modules/m1')//不用加js后缀;
var m2 = require('./modules/m2');
var m3 = require('./modules/m3')

m1.foo();
m2();
m3.foo()
// 在node环境下执行 node main.js