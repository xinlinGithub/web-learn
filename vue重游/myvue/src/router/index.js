import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home.vue'
import about from '../components/about.vue'
import docm from '../components/docm.vue'
import user from '../components/user.vue'
import err from '../components/err.vue'
import father from '../components/father.vue'
import mather from '../components/mather.vue'
import son from '../components/son.vue'
import seeson from '../components/seeson.vue'
import { fail } from 'assert';



Vue.use(VueRouter)
const routerConfig = {
    routes: [
        {
            path: '/home',
            name: 'home',
            meta: {
                index: 1,
                id_index: false
            },
            component: home,
            children: [{
                    path: 'father',
                    name: 'father',
                    component: father
                },{
                    path: 'mather',
                    name: 'mather',
                    component: mather
                },{
                    path: 'son',
                    name: 'son',
                    component: son
                },{
                    path: 'seeson',
                    name: 'seeson',
                    component: seeson
                }
            ]
        },
        {
            path: '/about/:id?',
            name: 'about',
            meta: {
                index: 2
            },
            component: about
        },
        {
            path: '/docm/:id?',
            name: 'docm',
            meta: {
                index: 3
            },
            beforeEnter: (to, from, next) => {
                if(from.fullPath == '/home'){
                    next()
                }else{
                    next('/about')
                }
            },
            component: docm
        },
        {
            path: '/user/:id?/passward/:pass_id?',
            name: 'user',
            meta: {
                index: 4
            },
            components: {
                default: user,
                top: home,
                bottom: about
            }
        },
        {
            path: '/err',
            name: 'err',
            component: err
        },
        {
            path: '*',
            redirect(to){
                if(to.path == '/'){
                    return {name: 'user',params: {id: 12121212, pass_id: 23232323}}
                }else{
                    console.log(to)                    
                    return {name: 'err', query: {id: 8888888}}
                }
            }
        }
    ],
    mode: 'hash'
}

const router = new VueRouter(routerConfig)
router.beforeEach((to,from,next) => {
    // console.log(to,from)
    if(to.fullPath == '/home/seeson'){
        if(to.matched[0].meta.id_index){
            next();
        }else{
            next('/home/son')
        }
    }else if(to.fullPath == '/home/son'){
        if(to.matched[0].meta.id_index){
            // next(from.fullPath)
            next('/home/seeson')
        }else{
            next()
        }
    }else{
        next()
    }
})
// router.afterEach((to,from) => {
//     console.log(to,from)
// } )
export default router