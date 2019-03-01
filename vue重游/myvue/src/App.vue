<template>
  <div id="app">
      <my-component></my-component>
      <span>我是app</span>   
      <ul class="router">
          <!-- <li><a href="#/docm">Docm(1)</a></li>                 -->
        <li><router-link :to="{path:'/home'}" tag="span">Home</router-link></li>
        <li><router-link to="/about/12334">About</router-link></li>
        <li><router-link :to="{path:'/docm', query: {id: 666666 }}">Docm</router-link></li>  
        <li><router-link :to="{name:'user', params: {id: 1234567}}">User</router-link></li>                      
      </ul>   
      <transition :name="dir">
        <router-view class="view"></router-view>
        <!-- <router-view class="view top" name="top"></router-view>
        <router-view class="view bottom" name="bottom"></router-view> -->
      </transition>
      <div class="body" v-html="body">body</div>
      
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import myComponent from './components/myComponent'
import $ from './daily/libs/util'
export default {
  name: 'App',
  components: {
    myComponent
  },
  data(){
    return {
      dir: 'right',
      body: null
    }
  },
  methods: {
    
  },
  watch: {
    $route(to,from){
      console.log(this.$route)
      this.dir = to.meta.index - from.meta.index > 0 ? 'right' : 'left'
    }
  },
  mounted() {
    $.ajax.get('news/9395306').then(res => {
      this.body = res.body;
      console.log(this.body)
    })
  }
}
</script>

<style lang="less">
  html,body,div,ul,li,a,p,span{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }
  html{
    font-size: 0;
    .router-link-active{
      background: #333;
    }
    .router-link-exact-active{
        background: #f40;
    } 
    
  }
  
</style>
<style scoped lang="less">
  .right-enter{
    transform: translateX(100%)
  }
  .right-enter-to{
    transform: translateX(0)
  }
  .right-leave{
    transform: translateX(0)    
  }
  .right-leave-to{
    transform: translateX(-100%)        
  }
  .right-enter-active,.right-leave-active{
    transition: all 1s ease-in-out;
  }

  .left-enter{
    transform: translateX(-100%)
  }
  .left-enter-to{
    transform: translateX(0)
  }
  .left-leave{
    transform: translateX(0)    
  }
  .left-leave-to{
    transform: translateX(100%)        
  }
  .left-enter-active,.left-leave-active{
    transition: all 1s ease-in-out;
  }
  html{
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
      .view{
        background: #ccc;
        height: 200px;
        width: 100%;
        border-right: 1px solid rgb(83, 22, 226);
        position: absolute;
      }
      .view.top{
        background: #aaa;
      }
      .view.bottom{
        background: #3e3e3e;
      }
      .body{
        font-size: 20px;
        margin-top: 300px;
      }
    }
</style>
