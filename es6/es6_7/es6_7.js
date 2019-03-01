
let fs = require("fs");

// fs.readFile("./data/num1.txt", "utf-8", (err, data) => {
//     if(err){
//         console.log(arr);
//     }else {
//         console.log(data);
//         // 这样会产生回调地域的问题
//         fs.writeFile("./data/num(1).txt", data, (err) => {
//             console.log(err,"写入成功")
//         })
//     }
// })

// 可以用promise化解决上述问题 就是将异步函数用promise包起来 执行完后resolve出去
function promisify(ways) {
    return (...args) => {//执行后返回promise对象 然后通过.then去操作
        return new Promise((resolve, reject) => {
            ways(...args,(err, data) => {
                if(data !== null || data !== ""){
                    resolve(data);
                }else {
                    reject(err);
                }
            })
        })
    }
}

// 通过promise化 使异步更优雅
// var readFile = promisify(fs.readFile);
// var writeFile = promisify(fs.writeFile);
// readFile("./data/num2.txt", "utf-8").then((data) => {
//     console.log(data);
//     writeFile("./data/num2(2).txt", "utf-8").then((data) => {
//         console.log("写入成功");
//     }).catch((err) => {
//         console.log(err)
//     })
// }).catch((err) => {
//     console.log(err)
// })

// 上面那个是 如果你想让哪个异步就promise化 亦可以把fs对象的方法都转化成promise化的函数

function promiseAll(fs) {
    for(let way in fs) {
        fs[way+"Async"] = promisify(fs[way]);
    }
    return fs;
}
// fs.readFile --> fs.readFileAsync 这样去使用
var myfs = promiseAll(fs)
myfs.readFileAsync("./data/num2.txt", "utf-8").then((data) => {
    myfs.readdirAsync("./data").then((data) => {
        console.log(data);
    })
})
// 都好使 但是异步操作会发生一些问题
// 1.出现回调地域
// 2.try catch无法捕获错误
// 3.同步并发异步的结果

