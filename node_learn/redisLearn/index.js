// redis 为一个非关系型数据库 就是没有那种表格 字段什么的 
// 它是利用哈希算法去存储  利用邻接链表把内存划分为几个大的区域 
// 然后在进行稍微的遍历
// 他能单个存储key value 
// 也可以存一个key对象 就是hset
// 为了防止key值想同 导致数据覆盖 通常存储时在key前面加上前缀
// 不同的业务用不同的前缀
// 如果想修改值 则直接再次设置一下就行
// 先安装 再使用 和mysql类似
var redis = require("redis");

var host = "127.0.0.1";
var port = "6379";
var password = "123456";

// 创建redis客户
var client = redis.createClient(port, host);
// 输入密码 只有输入密码后才可用
client.auth(password, function () {
    console.log("已输入密码！");
})


// redis key-value结构
function setKey(key, value, callback) {//封装set key 存库
    
    // 连接数据库 进行相关操作 取值或存值
    client.on("connect",function () {
        client.set(key, value, callback)
    })
    // del key 删除某个键值
}

function getKey(key, callback) {// 封装get key 取值
    // var client = redis.createClient(port, host);
    // client.auth(password, function () {
    //     console.log("已输入密码！");
    // })
    client.on("connect", function () {
        client.get(key, callback)
    })
}

function del(key, callback) {
    // 可以删除某个单独键值 也可以删除一个hash域
    client.on("connect", function () {
        client.del(key, callback);
    }) 
}
// setKey("key4", "panda4", function (error, reply) {
//     console.log(reply);
// })

// getKey("key4", function (error, reply) {
//     console.log(reply);
// })

function hset(hash, key, value, callback) {
    //存到一个固定的hash区域 存入多个key 到时候可以一下子取出这个区域的key value
    client.on("connect", function() {
        client.hset(hash, key, value, callback);
    })
    // hdel map1 key 删除
}
function hget(hash, key, callback) {
    // 获取一个哈希域中的某个键值
    client.on("connect" , function () {
        client.hget(hash, key, callback);
    })
}

function hdel(hash, key, callback) {
    // 删除指定hash中的键值
    client.on("connect", function () {
        client.hdel(hash, key, callback);
    }) 
}

function hgetall(hash, callback) {
    // 获取一个哈希域中所有的键值
    client.on("connect", function () {
        client.hgetall(hash, callback);
    })
}

function hmset(hash, paramsArr, callback) {
    // 可以在一个指定区域内连续设置多个键值
    client.on("connect", function () {
        client.hmset(hash, ...paramsArr, callback);
    }) 
}
module.exports.getKey = getKey;
module.exports.setKey = setKey;
module.exports.hset = hset;
module.exports.hget = hget;
module.exports.hgetall = hgetall;
module.exports.hmset = hmset;
module.exports.hdel = hdel;
module.exports.del = del;