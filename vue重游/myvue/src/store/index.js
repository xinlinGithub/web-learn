import Vue from 'vue'
import Vuex from 'vuex'
import { resolve } from 'path';
import state from '../state/state'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters: {
        selectMale: (state) => {
            return state.family.filter((item,index) => item.male)
        },
        findMa: (state,getters) => (male) => {
            Vue.set(state.family[0],'length',getters.filterArr.length)
            return state.family.find(item => item.male == male);
        },
        filterArr: (state) => {
            return state.ageArr.sort((a,b) => {
                return a - b
            })
        }
    },
    mutations: {
        inc(state,n = 1){
            state.count += n;
        },
        dis(state,payLoad){
            state.count -= payLoad.amount;
        }
    },
    actions: {
        incAsync(context,payLoad){
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    context.commit('inc',payLoad.amount)
                    resolve();
                },1000)
            })
        },
        disAsync({commit,rootState},payLoad){
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    commit('dis',payLoad)
                },1000)
            })
        }
    }
})