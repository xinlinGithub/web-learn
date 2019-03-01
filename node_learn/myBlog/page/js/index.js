
var everyday = new Vue({
    el: ".every_day",
    data: {
        content: ""
    },
    computed: {
        getContent() {
            // ajax获取数据
            return this.content;
        }
    },
    created() {
        var _this = this;
        axios({
            method: "get",
            url: '/queryEveryday'
        }).then(function(resp) {
            // 如果成功
            // console.log(resp);
            _this.content = resp.data.data[0].content;
        }).catch(function() {
            // 如果请求失败
            console.log("请求失败！");
        })
    }
})

var article = new Vue({
    el: ".article_list",
    data: {
        article_list: [],
        page: 1,//记录选择哪一页的位置
        curPage: 1,//记录当前的页面位置
        allPages: 1,
        pageSize: 5,
        count: 0,
        pageNumList: [],
        tags: ""
    },
    methods: {
        changePage(pages) {
            if(pages.text == "<<") {
                if(pages.page > 1) {
                    this.page -= 1;
                    this.generatePageList;
                }
            }else if(pages.text == ">>") {
                if(pages.page < this.allPages){
                    this.page += 1;
                    this.generatePageList;
                }
            }else {
                this.curPage = pages.text;
                if(this.tags == "" || this.tags == null) {
                    this.getPage(pages.page);
                }else{
                    this.getTagPage(pages.page);
                }
            }
        },
        getParams(resolve) {
            var locationSearchParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
            var paramsArr = locationSearchParams.split("&");
            for(var i = 0; i < paramsArr.length; i++) {
                var t = paramsArr[i].split("=");
                if(t.length > 1 && t[0] == "tags"){
                    this.tags = t[1];
                    break;
                }
            }
            resolve();
        },
        getTagPage(page) {
            var _this = this;
            axios({
                method: "get",
                url: "/queryTagBlogByPage?page=" + (page - 1) + "&pageSize=" + _this.pageSize + "&tags=" + this.tags
            }).then(function (resp) {
                var mydata = resp.data.data;
                _this.article_list = [];
                for(var i = 0; i < mydata.length; i++) {
                    var temp = {};
                    temp.title = mydata[i].title;
                    temp.content = mydata[i].content.replace(/<[^<>]+>/g, "").replace(/\s+/g, "");
                    temp.views = mydata[i].views;
                    temp.date = new Date(parseInt(mydata[i].ctime) * 1000).toLocaleDateString();
                    temp.tags = mydata[i].tags;
                    temp.link = "/blog_detail.html?bid=" + mydata[i].id;
                    temp.id = mydata[i].id;
                    _this.article_list.push(temp);
                }
            }).catch(function (resp) {
                console.log("请求错误！");
            })
        },
        selectPageStyle() {
            if(this.tags == "" || this.tags == null){
                this.getPage(this.page);
            }else {
                this.getTagPage(this.page);
            }
        }
    },
    computed: {
        getPage(){
            var _this = this;
            return function (page) {
                _this.page = page;
                axios({
                    method: "get",
                    url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + _this.pageSize
                }).then(function (resp) {
                    var mydata = resp.data.data;
                    _this.article_list = [];
                    for(var i = 0; i < mydata.length; i++) {
                        var temp = {};
                        temp.title = mydata[i].title;
                        temp.content = mydata[i].content.replace(/<[^<>]+>/g, "").replace(/\s+/g, "");
                        temp.views = mydata[i].views;
                        temp.date = new Date(parseInt(mydata[i].ctime) * 1000).toLocaleDateString();
                        temp.tags = mydata[i].tags;
                        temp.link = "/blog_detail.html?bid=" + mydata[i].id;
                        temp.id = mydata[i].id;
                        _this.article_list.push(temp);
                    }
                }).catch(function (resp) {
                    console.log("请求错误！");
                })
            }
        },
        generatePageList() {
            var nowpage = this.page;
            var allP = this.allPages;
            var pageList = [];
            var rightPage = nowpage;
            pageList.push({text: "<<", page: nowpage});
            if(nowpage > 2) {
                pageList.push({text: nowpage - 2, page: nowpage - 2});
            }
            if(nowpage > 1) {
                pageList.push({text: nowpage - 1, page: nowpage - 1});
            }
            pageList.push({text: nowpage, page: nowpage});
            if(nowpage + 1 <= allP) {
                pageList.push({text: nowpage + 1, page: nowpage + 1});
                rightPage = nowpage + 1;
            }
            if(nowpage + 2 <= allP){
                pageList.push({text: nowpage + 2, page: nowpage + 2})
                rightPage = nowpage + 2;
            }
            pageList.push({text: ">>", page: rightPage})
            this.pageNumList = pageList;
            return pageList;
        },
        init() {
            var _this = this;
            if(this.tags == "" || this.tags == null) {
                axios({
                    method: "get",
                    url: "/queryBlogPageCount"
                }).then(function(resp) {
                    // console.log(resp);
                    //当count获取后 在渲染博客列表 防止出错
                    _this.count = resp.data.data[0].count;
                    _this.allPages = parseInt((_this.count + _this.pageSize - 1) / _this.pageSize);
                    _this.generatePageList;
                })
            }else {
                axios({
                    method: "get",
                    url: "/queryTagBlogPageCount?tags=" + _this.tags
                }).then(function(resp) {
                    // console.log(resp);
                    //当count获取后 在渲染博客列表 防止出错
                    _this.count = resp.data.data[0].count;
                    _this.allPages = parseInt((_this.count + _this.pageSize - 1) / _this.pageSize);
                    _this.generatePageList;
                })
            }
            
        }
    },
    created() {
        var _t = this;
        var pro = new Promise(function (resolve, reject) {
            _t.getParams(resolve);
        }).then(function(){
            _t.selectPageStyle()
            _t.init;
        })
    }
})


// vue在宣布不再更新vue resource之后给大家推荐了axios。
// axios 简介 
// axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征： 
// 从浏览器中创建 XMLHttpRequest 
// 从 node.js 发出 http 请求 
// 支持 Promise API 
// 拦截请求和响应 
// 转换请求和响应数据 
// 取消请求 
// 自动转换JSON数据 
// 客户端支持防止 CSRF/XSRF

// 引入方式： 
// npminstallaxiosnpminstallaxios cnpm install axios //taobao源 

// 执行 GET 请求

// //get+url传参
// axios.get('/list?now_page=4')
//  .then(function (res) {
//  console.log(res);
//  })
//  .catch(function (err) {
//  console.log(err);
//  });
// // get+ params 对象传参

// axios.get('/list', {
//  params: {
//  now_page: 4
//  }
//  })
//  .then(function (res) {
//  console.log(res);
//  })
//  .catch(function (err) {
//  console.log(err);
//  });

// 执行 POST 请求

// axios.post('/login', {
//  useName: 'lzh',
//  password: '111'
//  })
//  .then(function (res) {
//  console.log(res);
//  })
//  .catch(function (err) {
//  console.log(err);
//  });
// 一） axios可以通过配置（config）来发送请求
// 1、 axios(config)

// //发送一个`POST`请求
// axios({
//     method:"POST",
//     url:'/user/12345',
//     data:{
//         firstName:"Fred",
//         lastName:"Flintstone"
//     }
// });
// 2、 axios(url[,config])

// 二）、 请求方式的别名，这里对所有已经支持的请求方式都提供了方便的别名
// axios.request(config);
 
// axios.get(url[,config]);
 
// axios.delete(url[,config]);
 
// axios.head(url[,config]);
 
// axios.post(url[,data[,config]]);
 
// axios.put(url[,data[,config]])
 
// axios.patch(url[,data[,config]])




