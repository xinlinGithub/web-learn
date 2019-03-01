// 生成当时的时间

function getNow() {
    return parseInt(Date.now() / 1000);//获取当前时间 以秒为单位
}

module.exports.getNow = getNow;