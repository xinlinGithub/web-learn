<template>
    <div class="user">
        我是{{ msg }} id: {{ $route.params.id }}
        passward: {{ passid }}
    </div>
</template>

<script>
    export default {
        data(){
            return {
                msg: 'user'
            }
        },
        computed: {
            passid(){
                var id = this.$route.params.pass_id ? this.$route.params.pass_id : '000000';
                return id
            }
        }
    }
</script>

<style scoped lang="less">
    .user{
        font-size: 20px;
        color: black;
    }
</style>