<template>
    <div class="daily">
        <div class="daily-menu">
            <div class="daily-menu-item" :class="{on: type === 'recommend'}" @click="handleToRecommend">每日推荐</div>
            <div class="daily-menu-item" :class="{on: type === 'daily'}" @click="getThemes">主题日报</div>
            <ul class="list" v-show="dailyShow">
                <li v-for="theme in themes" :key="theme.id">
                    <a href="#" :class="{on: type === 'daily' && theme.id === id}" @click="handleToTheme(theme.id)">{{ theme.name }}</a>
                </li>
            </ul>
        </div>
        <div class="daily-list" ref="list">
            <template v-if="type === 'recommend' || id === null">
                <div v-for="item in recommendList">
                    <div class="preTime">{{ changeItmeData(item.date) }}</div>                    
                    <div v-for="story in item.stories" :key="story.id">
                        <Item :data="story" :id="articleId" @click.native="handleClick(story.id)"></Item>
                    </div>
                </div>
            </template>
            <template v-if="type === 'daily'">
                <div v-for="item in list" :key="item.id">
                    <Item :data="item" :id="articleId" @click.native="handleClick(item.id)"></Item>
                </div>
            </template>
        </div>
        <daily-article :id="articleId"></daily-article>
        <!-- <div class="body" v-html="body">body</div> -->
    </div>
</template>

<script>

    // 主题日报
    import $ from './daily/libs/util'
    import Item from './daily/components/Item.vue'
    import dailyArticle from './daily/components/daily-article.vue'    
    export default {
        name: 'App1',
        components: {
            Item,
            dailyArticle
        },
        data(){
            return {
                themes: [],
                type: 'recommend',
                list: [],
                recommendList: [],
                id: null,
                isLoading: false,
                dailyShow: false,
                imgPath: null,
                dailyTime: $.getTodayTime(),
                articleId: 0
            }
        },
        methods: {
            getThemes(){
                // 获取主题日报的列表
                // 改变类型 以设置class类名；
                this.type = 'daily';
                //每次点击时置空；
                // this.themes = [];
                if(this.themes.length != 0){
                    this.dailyShow = true;
                    return 
                }
                $.ajax.get('themes').then(res => {
                    this.themes = res.others
                    this.dailyShow = true;                    
                })
            },
            handleToTheme(id){
                // 获取主题列表对应的内容
                this.id = id;
                this.list = [];
                this.isLoading = true;
                $.ajax.get('theme/' + id).then(res => {
                    this.list = res.stories.filter(item => {
                        return item.type != 1;
                    })
                    this.isLoading = false;
                })
            },
            handleToRecommend(){
                // 先为每日推荐做一些准备工作
                this.dailyShow = false;
                this.type = 'recommend';
                this.recommendList = [];
                this.getRecommendList();
            },
            getRecommendList(){
                // 真正的获取每日推荐对应的内容展示
                this.isLoading = true;   
                const prevDay = $.prevDay(this.dailyTime + 86400000)
                $.ajax.get('news/before/' + prevDay).then(res => {
                    this.recommendList.push(res);
                    this.isLoading = false;
                })
            },
            handleClick(id){
                // 点击标题 传文章id到组件 以获取文章内容
                this.articleId = id;
                console.log(id)
            },
            changeItmeData(data){
                // 将时间变成 几月几日的形式 
                var mouth = data.slice(4,6);
                mouth = mouth[0] == 0 ? mouth[1] : mouth;
                var day = data.slice(6,8);
                day = day[0] == 0 ? day[1] : day;                
                return mouth + '月' + day + '日'
            }
        },
        mounted() {
            // 挂在上时就默认加载 每日推荐的内容
            this.handleToRecommend();
            // 在绑定个事件 以至于 在每日推荐时 当滑动到底部时可以自动更新
            // 先获取要绑定事件的dom对象
            const $ref = this.$refs.list;
            // 刚挂载完就监听此事件；
            $ref.addEventListener('scroll',() => {
                // 不满足条件则不加载
                if(this.type === 'daily' || this.isLoading) return;
                if($ref.scrollTop + document.body.clientHeight >= $ref.scrollHeight) {
                    this.dailyTime -= 86400000;
                    this.getRecommendList();
                }
            })
        }
    }
</script>


<style scoped lang="less">
</style>