var res = require('./module_1.js');
// console.log(res.num,res.obj,res.arr)
console.log(res)

var arr = [1,2,3]
    arr1 = arr;
    arr[3] = 4;
    console.log(arr1)
var obj = {
    name: 'guowen',
    age: 18
}
var obj1 = obj;
obj.age = 44;
obj.name = null
console.log(obj1)
// 栈内存：基本类型 number string boolean 原始值  值传递类型
// 堆内存：对象或数组 地址的传递 即使之后改变里面的东西 也会同步