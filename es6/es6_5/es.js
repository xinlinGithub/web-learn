var fs = require("fs");

function promisefiy(ways) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            ways(...args, function (err, data) {
                if(data) {
                    resolve(data);
                }else {
                    reject(data);
                }
            })
        })
    }
}
// 使用生成器解决回调地域问题 就是一层套一层不停的回调的问题
// 先读1.txt 根据里面的内容依次往下读 知道读取3.txt里面的内容
var readFile = promisefiy(fs.readFile);
// readFile("1.txt","utf-8").then(data => {
//     console.log(data);
//     readFile(data, "utf-8").then(data1 => {
//         console.log(data1);
//         readFile(data1, "utf-8").then(data2 => {
//             console.log(data2);
//         })
//     })
// })
  
console.log("---------------------------------")
//   用generate一步一步去改写
  function* say() {
    let route1 = yield readFile('1.txt');
    // 期待第一步的返回值为接下来将要做的事；如果不加操作是实现不了的
    let route2 = yield readFile(route1);
    let finish = yield readFile(route2);
  }

//   let oSay = say(); //
//   let { value, done } = oSay.next(); //会返回第一次yield的产出值
//   value.then(val => {
//     var v1 = val.toString();
//     console.log(v1); //2.txt
//     let { value, done } = oSay.next(v1);
//     value.then(val => {
//         var v2 = val.toString();
//       console.log(v2); //3.txt
//       let { value, done } = oSay.next(v2);
//       value.then(val => {
//         var v3 = val.toString();
//         console.log(v3); //读取成功
//       });
//     });
//   });
  // 这样写还不是太好  还需再改进一下
  // 上面的代码层层调用 每一层长得还差不多 所以可以用递归去运算
  // co是让yeild具有一个等待功能 他可以拿到后面promise对象resolve之后传入的值
  // 这样就与await的工能相似
  function Co(iterator) {
    return new Promise((resolve, reject) => {
      let next = td => {
        const { value, done } = iterator.next(td);
        if (done) {
            // 最终才resolve
          resolve(value.toString());
        } else {
          value.then(val => {//当完成上一步后拿到值 继续执行自己写的next 知道done为true时为止
            console.log(val.toString()); //按理说应该next这个val
            next(val.toString());
          },(err) => console.log(err));
        }
      };
      next("1.txt");
    });
  }
// 这个例子不太恰当 但主要说明 当下一步的结果需要在上一步的回调中时拿取时 比较常用
// 这个例子可以用一个库来完成 叫co 可以用npm install co 安装上；
  Co(say()).then(
    val => {
      console.log(val);
    },
    err => {
      console.log(err);
    }
  )