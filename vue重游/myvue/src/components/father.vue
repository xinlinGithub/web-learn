<template>
    <div class="father">
        我是{{ msg }}
        <button @click="jumpHome">跳出牢笼，找user！</button>
        <button @click="clearHistory">想看记录！没门！！！</button>
        <button @click="retPage(2)">后退两页</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                msg: 'father'
            }
        },
        methods: {
            jumpHome(){
                this.$router.push('/user/1234567/passward/44444')
            },
            clearHistory(){
                this.$router.replace('/about/211340')
            },
            retPage(num){
                this.$router.go(-num)
            }
        }
    }
</script>

<style scoped lang="less">
    .father{
        font-size: 20px;
        color: black;
    }
</style>