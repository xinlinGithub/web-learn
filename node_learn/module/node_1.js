var res = require("./node_2.js");
// console.log(res);
// console.log(__dirname)
// console.log(__filename)

// 运行机制: require and module.exports is the system automatic 具有的吗？
// why can require and module.exports are used directly?
// and Are they originally possessed by the system? is it right;
// the answer is as follows:
// they aren`t originally possessed by the system.
// they run automatically in a function. in other words, the node.js module run automatically in a function
// The exports module.exports require __dirname and __filename are /
// all parameters(参数) introduced by the function. so we can use them directly.
// verify the following:
console.log(arguments[2] == module)
// the first parameter is exports
// the second parameter is require
// the third parameter is module
// the fourth parameter is __filename
// the fiveth patameter is __dirname
