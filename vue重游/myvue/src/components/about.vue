<template>
    <div class="about">
        我是{{ msg }} id: {{ $route.params.id }}
        <input type="button" @click="inc" value="+++">
        <input type="button" @click="dis" value="---">
        <input type="button" @click.right.prevent="incAsync" value="asyncInc">
        <div class="display">
            {{ myCount }} | {{ countPlus }}
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

    export default {
        data(){
            return {
                msg: 'about',
                num: 3
            }
        },
        methods: {
            inc(){
                this.add()
                // this.$store.commit('inc',4)
                // console.log(this.countPlus)
            },
            dis(){
                this.$store.commit({
                    type: 'dis',
                    amount: 3
                })
            },
            // ...mapMutations([
            //     'inc',
            //     'incBy',
            //     'dis',
            //     'disBy'
                // 只能用一个
            // ]),
            ...mapMutations({
                add: 'inc'
            }),
            incAsync(){
                this.$store.dispatch({
                    type: 'incAsync',
                    amount: 10
                }).then(() => {
                    this.$store.dispatch({
                        type: 'disAsync',
                        amount: 5
                    })
                })
            }
            // ...mapActions(['incAsync'])

        },
        // computed: {
        //     // count(){
        //     //     return this.$store.state.count;
        //     // }
        // },
        computed: {
            ...mapState({
                myCount: 'count',
                countPlus(state){
                    return state.count + this.num
                }
            })
        },
        watch: {
            $route(to, from){
                console.log(to,from)
            }
        }
       
    }
</script>

<style scoped lang="less">
    .about{
        font-size: 20px;
        color: black;
    }
</style>