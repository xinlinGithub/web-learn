


var siteMap = new Vue({
    el: "#siteMap",
    data: {
        tagsList: [],
        blogIdTitleList: []
    },
    methods: {
        getBlogTitle(){
            var tags = this.tagsList;
            for(let i = 0; i < tags.length; i++) {
                tags[i].content = [];
                var len = tags[i].blog_id.length;
                for(let j = 0; j < len; j++) {
                    tags[i].content.push(...this.blogIdTitleList.filter(function(value, index) {
                        return value.id == tags[i].blog_id[j];
                    }))
                }
            }
        },
        getBlogIdTitle(resolve) {
            var _t = this;
            axios({
                method: "get",
                url: "/queryBlogIdTitle"
            }).then(function (resp) {
                _t.blogIdTitleList = [];
                var t = resp.data.data;
                for(var i = 0; i < t.length; i++){
                    t[i].link = "/blog_detail.html?bid=" + t[i].id;
                    _t.blogIdTitleList.push(t[i]);
                }
                resolve();
            }).catch(function(resp){
                console.log("由标签检索文章内容失败！")
            })
        }
    },
    computed: {
        getTagsList() {
            var _t = this;
            return function () {
                axios({
                    method: "get",
                    url: "/queryTags"
                }).then(function (resp) {
                    var site = resp.data.data;
                    _t.tagsList = []
                    for(var i = 0; i < site.length; i++) {
                        var temp = {};
                        temp.id = site[i].id;
                        temp.tag = site[i].tag;
                        temp.content = [];
                        temp.blog_id = [];
                        _t.tagsList.push(temp);
                    }
                    _t.getTitleList();
                }).catch(function (resp) {
                    console.log("查找tags失败！")
                })
            }
        },
        getTitleList() {
            var _t = this;
            var tags = _t.tagsList;
            return function () {
                var pro = new Promise(function(resolve, reject) {
                    var n = 0;
                    for(let i = 0; i < tags.length; i++) {
                        axios({
                            method: "get",
                            url: "/queryBlodIdByTagMapping?id=" + tags[i].id
                        }).then(function (resp) {
                            var _data = resp.data.data;
                            for(let j = 0; j < _data.length; j++){
                                tags[i].blog_id.push(_data[j].blog_id);
                            }
                            n++;
                            if(n == tags.length){
                                resolve();
                            }
                        }).catch(function (resp) {
                            console.log("由映射查找blogid失败！")
                        })
                    }
                }).then(function () {
                    _t.getBlogTitle();
                })
            }
        }
    },
    created() {
        var _t = this;
        var pro = new Promise(function(resolve, reject) {
            _t.getBlogIdTitle(resolve);
        }).then(function () {
            _t.getTagsList();
        })
    }
})
