
// 整合数据监听器：this._observer 指令解析器：this._compile 事件订阅器：this._watcher
function MyVue(options={}) {
    this.$el = document.querySelector(options.el) || document.body;
    this._data = options.data;
    this._watcher = {}//事件订阅者
    // 调用原型上的方法
    this._observer(this._data)//传入数据 执行函数 重写get set 数据监听器
    this._compile(this.$el)//传入dom 解析指令 编译模板 发布订阅；
}

// 订阅者 事件订阅器
function Watcher(el, vm, dirVal, attr) {
    this.el = el;//dom element
    this.vm = vm;// vue 实例
    this.dirVal = dirVal;//指令绑定的属性值
    this.attr = attr;//dom属性获取值 回头会将此dom属性 与指令绑定的属性同步
    this.update();//更新视图
}
Watcher.prototype.update = function () {
    this.el[this.attr] = this.vm._data[this.dirVal]
}
// 数据监听器 数据劫持
// 当setter时就可以根据数据的变化情况 触发watcher更新视图


MyVue.prototype._observer = function (data) {
    // var _this = this;
    Object.keys(data).forEach((key) => {
        this._watcher[key] = {//每个数据一个订阅池；
            _directives: []//里面存放订阅池产生的对象
        }
        var val = data[key];//提前拿到数据 若在里面拿数据就会进入死循环 一直get
        var watcher = this._watcher[key];
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get() {
                console.log(`${key}:${val}`);
                return val;
            },
            set(newVal) {
                console.log(`更新${key}:${newVal}`)
                if(newVal !== val) {
                    val = newVal;
                    watcher._directives.forEach((item) => {
                        item.update()
                        // 遍历订阅池
                        // 遍历所有的指令 模板{{}} 通知_compile中的订阅者_watcher发布消息 更新视图
                    })
                }
            }
        })
    })

}

// 实现compile编译模板 连接watcher和observer
// 先深度遍历dom节点 
// 将模板中使用的变量更新成数据 初始化渲染页面视图
// 把指令中绑定的属性绑定到数据订阅池中
// 一旦数据变动 收到通知 跟新视图

MyVue.prototype._compile = function (el) {
    console.log(el)
    var _this = this;
    var nodes = el.childNodes;
    var len = nodes.length;
    for(var i = 0; i < len; i++) {
        var node = nodes[i];
        if(node.nodeType === 1) {//证明是dom元素
            this._compile(node)//深度遍历子节点
            var attrs = node.getAttributeNames();
            attrs.forEach(attr => {
                if(attr === "v-model" && (node.tagName == "INPUT" || node.tagName == "TEXTARER")){
                    node.addEventListener("input", (function (){
                        var attVal = node.getAttribute(attr);// 获取v-model绑定的属性值
                        _this._watcher[attVal]._directives.push(new Watcher(
                            node,//元素
                            _this,//vue实例
                            attVal,//指令绑定的属性值
                            "value"// input.value
                        ));
                        return function () {
                            _this._data[attVal] = node.value;// 每次触发input事件时都set值
                        }
                    }()))
                }
                if(attr.indexOf("v-bind:") === 0){
                    var value = attr.slice(7);
                    var attrVal = node.getAttribute(attr)
                    _this._watcher[attrVal]._directives.push(new Watcher(
                        node,
                        _this,
                        attrVal,
                        value
                    ))
                }
            })
        }else if(node.nodeType === 3) {
            var text = node.textContent;
            console.log(text)
            var reg = /\{\{(.*)\}\}/;
            if(reg.test(text)){
                var val = _getVM(_this._data, RegExp.$1);
                console.log(val)
                node.textContent = typeof val === "undefined" ? "" : val;
            }
        }
    }
}

function _getVM(vm, attr) {
    var val = vm;
    attr = attr.split(".");
    attr.forEach(key => {
        val = val[key];
    })
    return val;//拿到最深层级的值
}