<template>
    <div class="seeSon">
        我是{{ msg }},欢迎来看！
    </div>
</template>

<script>
    export default {
        data(){
            return {
                msg: 'seeSon'
            }
        }
    }
</script>
<style scoped lang="less">
    .seeSon{
        font-size: 20px;
        color: black;
    }
</style>