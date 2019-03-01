<template>
    <div class="docm">
        我是{{ msg }} id: {{ $route.query.id}}
    </div>
</template>

<script>

    export default {
        data(){
            return {
                msg: 'docm'
            }
        },
        beforeRouteEnter (to, from, next) {
            // 此时this还没有创建 可以通过回调 异步更改this中的内容
            next(vm => {
                vm.msg = 'new docm'
            })
        },
        beforeCreate(){
        }
    }
</script>

<style scoped lang="less">
    .docm{
        font-size: 20px;
        color: black;
    }
</style>