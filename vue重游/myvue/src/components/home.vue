<template>
    <div class="home-wrap">
        我是{{ msg }}
        <ul>
            <li><router-link :to="{path:'/home/father'}">fahter</router-link></li>
            <li><router-link :to="{name: 'mather'}">mather</router-link></li>
            <li><router-link to="/home/son">son</router-link></li>
            <li><router-link to="/home/seeson">seeson</router-link></li>            
        </ul>
        <!-- 路由视图加载的地方 -->
        <router-view class="view-home"></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                msg: 'home'
            }
        }
    }

</script>

<style scoped lang="less">
    .view-home{
        background: rgb(198, 187, 209);
    }
    .home-wrap{
        font-size: 20px;
        color: black;
        li{
            width: 100px;
            height: 50px;
            border: 1px solid red;
            background: #ccc;
            text-align: center;
            line-height: 50px;
            margin-left: 20px;
            display: inline-block;
            a{
                font-size: 30px; 
            } 
            span{
                color: peru;
                font-size: 25px;
                cursor: pointer;          
            }
        }  
        
    }
</style>