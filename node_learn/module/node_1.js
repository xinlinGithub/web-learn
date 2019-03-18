var res = require("./node_2.js");
// console.log(res);
// console.log(__dirname)
// console.log(__filename)
console.log(res);
setTimeout(() => {
    console.log(res);
    console.log(res.d.name);
    res.d.name = "fffffname;"
    res.b = "dfsfsgf";
}, 3000);
// 可以相互改变引用值 且会相互影响 但不能改变原始值
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
// console.log(arguments);
// the first parameter is exports
// the second parameter is require
// the third parameter is module
// the fourth parameter is __filename
// the fiveth patameter is __dirname


// { '0': {},
//   '1':{ [Function: require]
//      resolve: { [Function: resolve] paths: [Function: paths] },
//      main: Module {
//         id: '.',
//         exports: {},
//         parent: null,
//         filename: 'C:\\Users\\dell\\Desktop\\web-learn\\node_learn\\module\\node_1.js',
//         loaded: false,
//         children: [Array],
//         paths: [Array] },
//      extensions: { '.js': [Function], '.json': [Function], '.node': [Function] },
//      cache:
//       { 'C:\Users\dell\Desktop\web-learn\node_learn\module\node_1.js': [Object],
//         'C:\Users\dell\Desktop\web-learn\node_learn\module\node_2.js': [Object] } },
//   '2':Module {
//      id: '.',
//      exports: {},
//      parent: null,
//      filename: 'C:\\Users\\dell\\Desktop\\web-learn\\node_learn\\module\\node_1.js',
//      loaded: false,
//      children: [ [Object] ],
//      paths:[ 'C:\\Users\\dell\\Desktop\\web-learn\\node_learn\\module\\node_modules',
//         'C:\\Users\\dell\\Desktop\\web-learn\\node_learn\\node_modules',
//         'C:\\Users\\dell\\Desktop\\web-learn\\node_modules',
//         'C:\\Users\\dell\\Desktop\\node_modules',
//         'C:\\Users\\dell\\node_modules',
//         'C:\\Users\\node_modules',
//         'C:\\node_modules' ] },
//   '3': 'C:\\Users\\dell\\Desktop\\web-learn\\node_learn\\module\\node_1.js',
//   '4': 'C:\\Users\\dell\\Desktop\\web-learn\\node_learn\\module' }
