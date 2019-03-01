Vue.component('pane',{
    name: 'pane',
    template: '\
        <div :class="arr" v-show="show">\
            <slot></slot>\
        </div>\
    ',
    data(){
        return {
            show: false,
            arr: ['pane']
        }
    },
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: ""
        }
    },
    methods: {
        updateNav(){
            this.$parent.updateNav();
        }
    },
    watch: {
        label(){
            this.updateNav();
        },
        show(){
            setTimeout(() => {
                this.arr = ['pane',{'active': this.show}];
            })
        }
    },
    mounted(){
        this.updateNav();
    }
})