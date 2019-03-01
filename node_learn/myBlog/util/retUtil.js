function writeResult(status, msg, data) {//作为每次接受到ajax请求后的返回值
    // 返回值的内容有 状态 备注 数据 
    return JSON.stringify({status: status, msg: msg, data: data});
}

module.exports.writeResult = writeResult;