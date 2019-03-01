var mongo = require("./index");

var obj = {name: "duck", age: 5, sex: 1}
// mongo.insertOne("panda", "animals", obj, function (err, res) {
//     if(err == null) {
//         console.log(res);
//     }else {
//         console.log(err);
//     }
// })

// mongo.remove("panda", "animals", {name: "duck"}, function (err, res) {
//     if(err == null) {
//         console.log("remove Success!");
//     }else {
//         console.log("remove Error" + err);
//     }
// })
// mongo.createCollection("panda", "teachers", function (err, res) {
//     if(err == null) {
//         console.log("createCollection Success!");
//     }else {
//         console.log("createCollection Error" + err);
//     }
// })
// mongo.dropCollection("panda", "teachers", function (err, res) {
//     if(err == null) {
//         console.log("dropCollection Success!");
//     }else {
//         console.log("dropCollection Error" + err);
//     }
// })
// mongo.updataOne("panda", "animals",{name: "fish"} , {$inc: {age: 10}},function (err, res) {
//     if(err == null) {
//         console.log("updataOne Success!");
//     }else {
//         console.log("updataOne Error" + err);
//     }
// })
// mongo.find("panda", "animals", null,function (err, res) {
//     if(err == null) {
//         console.log(res);
//     }else {
//         console.log("updataOne Error" + err);
//     }
// })
// mongo.findSort("panda", "animals", null, null, function (err, res) {
//     if(err == null) {
//         console.log(res);
//     }else {
//         console.log(err);
//     }
// })
mongo.findSkipLimit("panda", "animals", null, 2, 4,null, function(err, res) {
    if(err == null) {
        console.log(res);
    }else {
        console.log(err);
    }
})