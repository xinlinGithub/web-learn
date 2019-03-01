// async 异步 await 等待 他是个es7的语法糖 是通过generate+co(primise化)实现的 在es6_5.html上

// async是用来声明一个方法是异步执行
// await是用来等待一个异步函数执行完成
// await只能出现在异步函数中 如果一个函数不是异步 用async声明后就会变成异步 里面就可以用await语法了
// 如果本身就是异步的函数 不用async 也可以用await语法 
// async会将后面的函数变成异步 并将返回值封装成一个promise对象返回 可以通过.then操作
// await是等待 后面的返回值 若是同步返回值 则直接拿到就行 若是异步promise则会阻塞后面的代码 
// 一直等到promise中resolve之后才行 并返回resolve中传的值 虽说是阻塞 但它本身就用在异步函数中
// 所以不会阻塞函数外部的执行
// 能更优雅的处理异步 还可以被try catch 捕获错误

var fs = require("fs");

function readFile(url) {
    return new Promise((resolve,reject) => {
        console.log(url)
        fs.readFile(url, "utf-8", (err, data) => {
            if(data !== null && data !== "" && data !== undefined){
                resolve(data);
            }else {
                reject(err);
            }
        })
    })
}

// function test(url) {
//     return new Promise((resolve, reject) => {
//         resolve(url);
//     });
// }
// async function read(url) {
//     try{
//         let url2 = await readFile(url);//相当于把result之后传的值给了url2 下一步用
//         //await后面的必须是一个promise对象 这样才可以.then操作 拿到他执行后的值
//         let url3 = await readFile(url2);
//         let result = await readFile(url3);
//         return result;
//     }catch (e) {
//         console.log("catch", e)
//     }
    
// }

//  read("./data/1.txt").then((data) => {
//      console.log(data);
//  })

//  解决同步并发异步的结果问题
// 下面当传入的所有promise对象都resolve后才会执行 但有一个报错就不执行
// Promise.all([readFile("./data/1.txt"),readFile("./data/2.txt"),readFile("./data/3.txt")])
//         .then((data) => {
//             console.log(data);
//         })

// 可以用 async+await来解决上述问题 当有一个报错时其余的还可以执行

async function readUrl1(url) {
    try{
        return await readFile(url);//await 只是等待他执行完再执行下一步 就是当他resolve之后再执行下一步
    }catch (e) {
        console.log(e);
    }
}
async function readUrl2(url) {
    try{
        return await readFile(url);
    }catch (e) {
        console.log(e);
    }
}
async function readFile3(url) {
    try{
        return await readFile(url);
    }catch(e) {
        console.log(e);
    }
}
function readAll(arg) {
    return Promise.all(arg);
}
// 当读取到错误后 会继续执行完下面的事件 最后Promise.All()仍好使；
// readAll([readUrl1("./data/5.txt"),readUrl1("./data/2.txt"),readUrl1("./data/3.txt")]).then(data => {
//     console.log(data);
// })

// 异步读取文件

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) reject(error);
      resolve(data);
    });
  });
};

// var gen = function* (){
//   var f1 = yield readFile('./data/1.txt');
//   var f2 = yield readFile('./data/2.txt');
//   console.log(f1);
//   console.log(f2);
// }
// var g = gen();这样直接执行yield不会对后面的promise进行等待 必须借助一个co库才行 
// 这也是async+await优越于他的原因
// console.log(g.next("d"));
// console.log(g.next("fdg"));
// g.next("sgfdhd")

async function async_gen() {
    var f1 = await readFile('./data/1.txt');
    var f2 = await readFile('./data/2.txt');
    console.log(f1.toString());
    console.log(f2.toString());
}
async_gen();