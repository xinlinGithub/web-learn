// 实现数据监听器 Observer
// 实现事件订阅器 Watcher 订阅者
// 实现指令解析器compile 将dom书写的vue模板替换成数据 以及绑定相应的事件更新函数
// MVVM入口函数 整合以上三者

// var obj = {
//     name: "vue",
//     arr: [1,2,3],
//     person: {
//         name: "person"
//     }
// }
// observe(obj);

function observe(data) {
    if(typeof data !== "object") {
        return;
    }
    Object.keys(data).forEach(key => {
        var val = data[key];
        observe(val);//监听子对象 确保每个对象都能监听到
        defineDeactive(data, key, val);
    })
}   
function defineDeactive(data, key, val) {
    let dep = new Dep();
    //利用闭包 每个属性get时和set时拿到的dep都是同一个dep 这样就实现了一一对应
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get() {
            console.log("get:" + key);
            // 把watcher添加进去
            Dep.target && dep.depend();
            return val;
        },
        set (newVal) {
            if(val === newVal) {
                return;
            }
            console.log("set:" + key + newVal);
            console.log(dep)
            val = newVal;
            dep.notify()//通知所有的订阅者
        }
    })
}

// 监听数据变化之后怎么通知订阅者那 这是关键 通过在set函数中触发订阅器
// 那具体有时怎样那
// 实现订阅器
Dep.uid = 0;
function Dep() {
    this.id = Dep.uid;
    this.subs = [];//订阅池
    Dep.uid += 1;
}
Dep.prototype = {
    addSub(sub) {// 添加订阅事件
        this.subs.push(sub);
    },
    notify() {//在set里面通知订阅器 触发订阅事件对象 
        // 每个订阅事件对象里都有一个update函数 执行后用来更新数据
        console.log(this.subs)
        this.subs.forEach(sub => {
            sub.update();
        })
    },
    removeSub(sub) {
        var index = this.subs.indexOf(sub);
        if(index != -1) {
            this.subs.splice(index, 1);//删除指定订阅事件；
        }
    },
    depend() {
        // 订阅者添加订阅器对象 在初始get的时候都添加上；
        // 也就是在Dep.target上添加dep对象 此this指 dep对象
        console.log("deee")
        Dep.target.addDep(this);
    }
}
// Dep.target = null;//给Dep函数添加个全局的属性
// 那么是谁来订阅那 怎么往订阅器里添加事件对象那 订阅者如何实现那
// 实现订阅器watcher 用来连接compile 与 observe
// 在自身实例化时网Dep上添加自己 本身有个update方法 当dep.notify时 触发自身的update方法
// 然后调用compile的回调 在compile中会生成watcher对象
function Watcher(vm, exp, cb) {
    this.vm = vm;// vue实例
    this.exp = exp;// 模板属性值
    this.cb = cb;//回调函数
    this.depIds = {};
    // 初始化时 在自己的get中去触发observe中的get 数据劫持 
    // 通过dep将dep.target存到subs中 订阅事件
    this.value = this.get();
}

Watcher.prototype = {
    update() {
        console.log(this);
        var value = this.get();//拿到新值
        var oldVal = this.value
        if(value !== oldVal) {
            this.value = value;//每次都保存上一次的值
            // 执行compile中绑定的回调 更新视图；
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get() {
        Dep.target = this;//赋值
        // console.log(Dep.target)
        console.log(this.vm, this.exp);
        var value = this.vm[this.exp];//observer会进行数据劫持 触发get 里面dep将dep.target存到subs中
        console.log(value)
        Dep.target = null;//存完就销毁
        return value;//将get到的值拿到自己里面用 这是新值
    },
    addDep(dep) {
        console.log(dep)
        if(!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            console.log(dep)
            this.depIds[dep.id] = dep;
        }
    }
}
// 实现compile：他的作用是解析模板指令 将模板变量换成数据 初始化视图 
// 再为每个指令对应的节点绑定指定的函数

Compile.prototype = {
    init(){
        this.compileElement(this.$el);
    },
    compileElement(el) {
        var childNodes = el.childNodes,
            me = this;
            console.log(childNodes);
        [].slice.call(childNodes).forEach(node => {
            if(node.nodeType === 1) {
                this.compileElement(node);
            }else if(node.nodeType === 3){
                var text = node.textContent;
                var reg = /\{\{(.*)\}\}/; 
                if(reg.test(text)){
                    // 这一句用来初始化的时候替代模板
                    node.textContent = me.getVal(me.$vm, RegExp.$1.trim());
                    new Watcher(me.$vm, RegExp.$1.trim(), function (value, oldVal) {
                        node.textContent = value;
                    })
                }
            }
        })
    },
    getVal (vm, content) {
        var val = vm._data;
        content.split(".").forEach(key => val = val[key.trim()]);
        return val;
    },
    isDirective(attr) {
        return attr.indexOf("v-") === 0;
    },
    isEventDirective(attr) {
        return attr.indexOf("on") === 0;
    },
    isElementNode(node) {
        return node.nodeType === 1;
    },
    isTextNode(node) {
        return node.nodeType === 3;
    }
}

function Compile(el, vm) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if(this.$el) {
        this.init();
    }
}

function MVue(options = {}) {
    this.$options = options;
    this._data = this.$options.data;
    Object.keys(this._data).forEach(key => {
        this._proxy(key);
    }),
    observe(this._data, this);
    this.$compile = new Compile(options.el || document.body, this);
}
MVue.prototype = {
    _proxy(key) {
        var _this = this;
        Object.defineProperty(_this, key, {
            enumerable: true,
            configurable: false,
            get() {
                return _this._data[key];
            },
            set (newVal) {
                _this._data[key] = newVal;
            }
        })
    }
}