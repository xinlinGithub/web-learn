
var blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: "",
        id: -1,
        bid: 0
    },
    methods: {
        updataBlogViews(resolve) {
            axios({
                method: "get",
                url: "/updateBlogViewsByBid?bid=" + this.bid
            }).then(function (resp) {
                resolve();
            }).catch(function (resp) {
                console.log("更新view失败！")
            })
        }
    },
    created() {
        var locationSearchParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
        var paramsArr = locationSearchParams.split("&");
        var _t = this;
        for(var i = 0; i < paramsArr.length; i++) {
            var t = paramsArr[i].split("=");
            if(t.length > 1 && t[0] == "bid"){
                this.bid = parseInt(t[1]);
                var pro = new Promise(function (resolve, reject) {
                    _t.updataBlogViews(resolve);
                }).then(function () {
                    axios({
                        method: "get",
                        url: "/queryBlogByid?bid=" + _t.bid
                    }).then(function (resp) {
                        var detailContent = resp.data.data[0];
                        _t.content = detailContent.content;
                        _t.views = detailContent.views;
                        _t.id = detailContent.id;
                        _t.ctime = new Date(parseInt(detailContent.ctime) * 1000).toLocaleDateString();
                        _t.title = detailContent.title;
                        _t.tags = detailContent.tags;
                    }).catch(function (resp) {
                        console.log("查询blog_detail失败！");
                    })
                })
                break;
            }
        }
    }
})

var sendComments = new Vue({
    el: "#sendComments",
    data: {
        bid: 0,
        randomCode: "",
        randomCodeText: "",
        commentParent: -1,
        commentParentName: "0"
    },
    methods: {
        sendComments() {
            var  _t = this;
            var blog_id = this.bid;
            var user_name = $("#comment_name").val();
            var comment = $("#comment_content").val();
            var parent = parseInt($("#parent").val());
            var parent_name = $("#parent_name").val();
            var email = $("#comment_email").val();
            var comment_code = $("#comment_code").val();
            if(user_name == "" || comment == "" || email == ""){
                alert("你有未填写的项目，请填写完整！")
                return;
            }
            if(comment_code != this.randomCodeText) {
                alert("验证码有误，请重新输入验证码！")
                return;
            }  
            axios({
                method: "get",
                url: "/insertIntoComment?blog_id=" + blog_id + "&parent=" + parent +"&user_name=" + user_name + "&comment=" + comment + "&email=" + email + "&parent_name=" + parent_name
            }).then(function(resp) {
                $("#comment_name").val("");
                $("#comment_content").val("");
                $("#comment_email").val("");
                $("#comment_code").val("");
                $("#parent").val("-1");
                $("#parent_name").val("0");
                blogComments.getCommentCounts();
                blogComments.getComments();
                _t.getRandomCode();
            }).catch(function (resp) {
                console.log("评论错误！");
            })
        },
        getRandomCode() {
            var _t = this;
            axios({
                method: "get",
                url: "/queryRandomCode"
            }).then(function (resp) {
                _t.randomCode = resp.data.data.data;
                _t.randomCodeText = resp.data.data.text;
            }).catch(function (resp) {
                console.log("验证码加载失败！");
            })
        },
        changeCode() {
            this.getRandomCode();
        }
    },
    computed: {
        getBid() {
            return function () {
                var locationSearchParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
                var paramsArr = locationSearchParams.split("&");
                for(var i = 0; i < paramsArr.length; i++) {
                    var t = paramsArr[i].split("=");
                    if(t.length > 1 && t[0] == "bid"){
                        this.bid = parseInt(t[1]);
                        break;
                    }
                }
            }
        }
    },
    created() {
        this.getBid();
        this.getRandomCode();
    }
})

var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        commentCounts: 0,
        bid: 0,
        commentList: []
    },
    methods: {
        replyOption(replyName, parentid) {
            $("#parent").val("" + parentid);
            $("#parent_name").val(replyName);
        }
    },
    computed: {
        getBid() {
            return function () {
                var locationSearchParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
                var paramsArr = locationSearchParams.split("&");
                for(var i = 0; i < paramsArr.length; i++) {
                    var t = paramsArr[i].split("=");
                    if(t.length > 1 && t[0] == "bid"){
                        this.bid = parseInt(t[1]);
                        break;
                    }
                }
            }
        },
        getCommentCounts() {
            var  _t = this;
            return function () {
                axios({
                    method: "get",
                    url: "/queryCommentCountByBlogid?bid=" + parseInt(this.bid)
                }).then(function (resp) {
                    _t.commentCounts = resp.data.data[0].count;
                }).catch(function (resp) {
                    console.log("查询失败！")
                })
            }
        },
        getComments() {
            var _t = this;
            return function () {
                axios({
                    method: "get",
                    url: "/queryCommentsByBid?bid=" + parseInt(_t.bid)
                }).then(function (resp) {
                    _t.commentList = [];
                    var temp = resp.data.data;
                    for(var i = 0; i < temp.length; i++) {
                        var list = {};
                        list.comment = temp[i].comment;
                        list.ctime = new Date(parseInt(temp[i].ctime )*1000).toLocaleDateString();
                        list.user_name = temp[i].user_name;
                        list.parent = temp[i].parent;
                        list.parent_name = temp[i].parent_name;
                        list.id = temp[i].id;
                        _t.commentList.push(list);
                    }
                }).catch(function (resp) {
                    console.log("查询评论失败！");
                })
            }
        }
    },
    created() {
        this.getBid();
        this.getCommentCounts();
        this.getComments();
    }
})