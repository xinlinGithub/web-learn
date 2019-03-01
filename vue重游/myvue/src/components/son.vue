<template>
    <div class="son">
        我是{{ msg }}
        <button @click="seeSon">点我方能看我！</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                msg: 'son'
            }
        },
        methods: {
            seeSon(){
                this.$route.matched[0].meta.id_index = true;
            }
        }
    }
</script>

<style scoped lang="less">
    .son{
        font-size: 20px;
        color: black;
    }
</style>