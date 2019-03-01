// module.exports = value;
// exports.val = value;
// 以上两种方法暴露模块 exports本质是一个空对象 这是CommonJs规范

module.exports = {
    msg: 'm1',
    foo(){
        console.log(this.msg)
    }
}