<template>
    <a href="#" class="item-list" :class="{on: id === data.id}">
        <div class="img" v-show="imgPath">
                暂无图片
            <!-- <img :src="imgPath" alt="" v-once> -->
        </div>
        <div class="daily-title" :class="{noImg: imgPath === ''}">
            {{ data.title }}
        </div>
    </a>
</template>

<script>
    export default {
        name: 'Item',
        data(){
            return {
            }
        },
        props: {
            data: {
                type: Object,
                default(){
                    return {}
                }
            },
            imgPath: {
                type: String,
                default: ""
            },
            id: {
                type: Number,
                default: 0
            }
        },
    }
</script>
<style scoped lang="less">
    .item-list{
        display: block;
        color: inherit;
        text-decoration: none;
        padding: 16px;
        overflow: hidden;
        transition: all .3s ease-in-out;
        &:hover,&.on{
            background: #e3e8ee;
        }
        .img{
          width: 80px;
          height: 80px;
          float: left;  
          img{
              width: 100%;
              height: 100%;
              border-radius: 3px;
          }
        }
        .daily-title{
            padding: 10px 5px 10px 100px;
        }
        .daily-title.noImg{
            padding-left: 5px;
        }
    }
</style>