var randomCloud = new Vue({
    el: "#randomCloud",
    data: {
        tags: []
    },
    methods: {
        getRandomCloud() {
            var _t = this;
            axios({
                method: "get",
                url: "/queryBlogTags"
            }).then(function (resp) {
                var tags = resp.data.data;
                _t.tags = [];
                for(var i = 0; i < tags.length; i++) {
                    var temp = {};
                    temp.id = tags[i].id;
                    temp.tag = tags[i].tag;
                    temp.link = "/index.html?tags=" + temp.tag;
                    _t.tags.push(temp);
                }
            }).catch(function (resp) {
                console.log("查找标签云失败！")
            })
        }
    },
    computed: {
        randomColor() {
            return function () {
                var r = Math.random() * 245 + 10;
                var g = Math.random() * 245 + 10;
                var b = Math.random() * 245 + 10;
                return `rgb(${r}, ${g}, ${b})`;
            }
        },
        randomSize() {
            return function () {
                var size = Math.random() * 16 + 14;
                return size + "px";
            }
        }
    },
    created() {
        this.getRandomCloud();
    }
})

var footer = new Vue({
    el: "#footer",
    data: {
        tags: []
    },
    methods: {
        getRandomCloud() {
            var _t = this;
            axios({
                method: "get",
                url: "/queryBlogTags"
            }).then(function (resp) {
                var tags = resp.data.data;
                _t.tags = [];
                for(var i = 0; i < tags.length; i++) {
                    var temp = {};
                    temp.id = tags[i].id;
                    temp.tag = tags[i].tag;
                    temp.link = "/index.html?tags=" + temp.tag;
                    _t.tags.push(temp);
                }
            }).catch(function (resp) {
                console.log("查找标签云失败！")
            })
        }
    },
    created() {
        this.getRandomCloud();
    }
});
var nowhot = new Vue({
    el: "#now_hot",
    data: {
        maxList: 8,
        hots: []
    },
    methods: {
        getHotList() {
            var _t = this;
            axios({
                method: "get",
                url: "/queryBlogByViews?maxList=" + this.maxList
            }).then(function (resp) {
                var mydata = resp.data.data;
                _t.hots = [];
                for(var i = 0; i < mydata.length; i++) {
                    var temp = {};
                    temp.title = mydata[i].title;
                    temp.link = "/blog_detail.html?bid=" + mydata[i].id;
                    temp.views = mydata[i].views;
                    _t.hots.push(temp);
                }
            }).catch(function (resp) {
                console.log("查询最近热门失败！")
            })
        }
    },
    created() {
        this.getHotList();
    }
})

var comment = new Vue({
    el: "#now_comment",
    data: {
        maxList: 8,
        comments: []
    },
    methods: {
        getHotCommentList() {
            var _t = this;
            axios({
                method: "get",
                url: "/queryCommentById?maxList=" + this.maxList
            }).then(function (resp) {
                var mydata = resp.data.data;
                _t.comments = [];
                for(var i = 0; i < mydata.length; i++) {
                    var temp = {};
                    temp.user = mydata[i].user_name;
                    temp.date = new Date(parseInt(mydata[i].ctime) * 1000).toLocaleDateString();;
                    temp.content = mydata[i].comment;
                    temp.parent_name = mydata[i].parent_name;
                    temp.parent = mydata[i].parent;
                    _t.comments.push(temp);
                }
            }).catch(function (resp) {
                console.log("查询最近热门失败！")
            })
        }
    },
    created() {
        this.getHotCommentList();
    }
})

var search = new Vue({
    el: "#search_bar",
    data: {
        search_list: [],
        blogIdTitleList: [],
        showText: [],
        title: [],
        link: ""
    },
    methods: {
        jumpPage() {
            var val = $("#inp").val();
            if(!this.title.includes(val) || val == "" || val == null){
                return;
            }
            location.href = this.link;
        },
        tapTitle(title,link){
            this.showText = [];
            $("#inp").val(title);
            $("#inp").focus();
            this.link = link;
        },
        showList() {
            var input = $("#inp");
            var val = input.val().trim();
            this.showText = [];
            if(val == null || val == "") {
                return;
            }
            for(var i = 0; i < this.len; i++){
                var title = this.blogIdTitleList[i].title;
                if(title.includes(val)) {
                    this.showText.push(this.blogIdTitleList[i]);
                }
            }
        },
        getBlogIdTitle() {
            var _t = this;
            axios({
                method: "get",
                url: "/queryBlogIdTitle"
            }).then(function (resp) {
                _t.blogIdTitleList = [];
                _t.title = [];
                var t = resp.data.data;
                for(var i = 0; i < t.length; i++){
                    _t.title.push(t[i].title);
                    t[i].link = "/blog_detail.html?bid=" + t[i].id;
                    _t.blogIdTitleList.push(t[i]);
                }
            }).catch(function(resp){
                console.log("由标签检索文章内容失败！")
            })
        }
    },
    computed:{
        len() {
            return this.blogIdTitleList.length;
        }
    },
    created() {
        this.getBlogIdTitle();
    }
})