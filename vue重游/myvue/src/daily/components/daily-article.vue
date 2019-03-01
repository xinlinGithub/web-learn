<template>
    <div class="daily-content">
        <div class="daily-article-title" v-show="flagTitle">{{ data.title }}</div>
        <div class="daily-article-content" v-html="data.body"></div>
        <div class="daily-comments" v-show="comments.length">
            <span>评论({{ comments.length }})</span>
            <div class="daily-comment" v-for="comment in comments" :key="comment.id">
                <div class="daily-comment-avatar">
                    暂无图片
                </div>
                <div class="daily-comment-content">
                    <div class="daily-comment-name">{{ comment.name }}</div>
                    <div class="daily-comment-time" v-timer="comment.time">{{ comment.time }}</div>
                    <div class="daily-comment-text">{{ comment.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from '../libs/util'
    import timer from '../directives/time.js'
    export default {
        data() {
            return {
                data: {},
                comments: [],
                flagTitle: true
            }
        },
        directives: {
            timer
        },
        props: {
            id: {
                type: Number,
                default: 0
            }
        },
        methods: {
            getArticle(val){
                // 由ID值获得对应的文章内容 再在下面获得评论内容 必须由自己的变量接受一下
                $.ajax.get('news/' + val).then(res => {
                    res.body = res.body.replace(/src="http/g,'a');
                    var reg = /h1/g;
                    if(reg.test(res.body)){
                        this.flagTitle = false
                    }
                    this.data = res;
                })
                this.getComment();
            },
            getComment(){
                this.comments = [];
                $.ajax.get('story/' + this.id + '/short-comments').then(res => {
                    this.comments = res.comments;
                })
            }
        },
        watch: {
            id(val){
                // 监听ID值得改变 一变化就重新获取
                this.getArticle(val)
                console.log('zujian' + val)
            }
        }
    }
</script>
<style scoped lang="less">
    .daily-content{
        margin-left: 450px;
        padding: 20px;
        .daily-article-title{
            font-size: 28px;
            font-weight: bold;
            color: #222;
            padding: 10px 0;
        }
        .daily-comments{
           margin: 10px 0;
           span{
               display: block;
               margin: 10px 0;
               font-size: 20px;
           }
           .daily-comment{
               overflow: hidden;
               margin-bottom: 20px;
               padding-bottom: 20px;
               border-bottom: 1px dashed #e3e8ee;
               .daily-comment-avatar{
                   width: 50px;
                   height: 50px;
                   float: left;
                   color: red;
                   font-size: 20px;
                   line-height: 25px;
                   text-align: center;
                   vertical-align: center;
               }
               .daily-comment-content{
                   margin-left: 65px;
                   .daily-comment-name{
                       font-size: 23px;
                   }
                   .daily-comment-time{
                       color: #9ea7b4;
                       font-size: 14px;
                       margin-top: 5px;
                   }
                   .daily-comment-text{
                       margin-top: 10px;
                   }
               }
           }
        }
    }
</style>