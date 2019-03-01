<template>
    <div class="mather">
        我是{{ msg }}
        <div class="count">
            {{ count }}
        </div>
        <ul>
            <li v-for="item in mama" :key="item.name">{{ item.name }} | {{ item.male }}</li>
        </ul>
        <p v-for="(item,key) in mama" :key="item">{{ key }}: {{ item }}</p>
        <p>{{ mama }} | {{ filterArr | myArr}}</p>
        <p>{{ filterArr | myArr }}</p>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapGetters } from 'vuex'
    export default {
        data(){
            return {
                msg: 'mather'
            }
        },
        filters: {
            myArr: (arr) => {
                var newArr = arr.filter(item => item < 50)
                console.log(newArr)
                return newArr
            }
        },
        computed: {
            ...mapState(['count']),
            // family(){
            //     return this.$store.getters.selectMale
            // }
            ...mapGetters(['selectMale','filterArr','filterArr']),
            mama(){
                return this.$store.getters.findMa(false)
            }
        }

    }
</script>

<style scoped lang="less">
    .mather{
        font-size: 20px;
        color: black;
    }
</style>