console.log("node node node")
var a = 123;
var b = "bbb";
var c = 'cccc';
// exports = b;
// module.exports = a;
// exports.a = a;
// module.exports.b = b;
module.exports = { a, b }
// exports.c = c
// console.log(exports == module.exports)
// module.exports 与 exports 指向同一个对象 但最终返回的始终是module.exports
// 就是说他两个同时赋值时, 返回的是module.exports, 一旦module.exports重新赋值后,exports 与
// module.exports 就不在相等，此时返回的是module.exports, exports就不起作用了,s所以最好一直使用module.exports;
console.log(arguments[2] == module)