Vue.component('tab',{
    template: '\
        <div class="tabs">\
            <div class="tabs-bar">\
                <div :class="tabCls(pane)"\
                    v-for="(pane,index) in nativeList"\
                    @click="changTab(index)"\
                >\
                {{ pane.label }}\
                </div>\
            </div>\
            <div class="tabs_content">\
                <slot></slot>\
            </div>\
        </div>\
    ',
    data(){
        return {
            nativeList: [],
            currentValue: this.value
        }
    },
    props: {
        value: [String,Number]
    },
    methods: {
        tabCls(item){
            return [
                'tabs-tab',
                {
                    'tabs-bar-active': this.currentValue == item.name
                }
            ]
        },
        getPane(){
            return this.$children.filter((pane, index) => {
                // console.log(pane.$options.name)
                return pane.$options.name === 'pane';
            })
        },
        updateNav(){
            var pane = this.getPane();
            // console.log(pane)
            pane.forEach((item,index) => {
                this.nativeList.push({
                    name: item.name || index,
                    label: item.label
                })
                if(!item.name){
                    item.name = index;
                }
                if(index === 0){
                    if(!this.currentValue){
                        this.currentValue === item.name || index;
                    }
                }
            })
            this.nativeList.splice(3);
            this.updateStates()
            console.log(this.nativeList)
        },
        updateStates(){
            var tabs = this.getPane();
            tabs.forEach((item,index) => {
                item.show = this.currentValue == item.name;
            })
        },
        changTab(index){
            var name = this.nativeList[index].name;
            this.currentValue = name;
            this.$emit('input',name)
            this.$emit('on-click',name);

        }
    },
    watch: {
        currentValue(val){
            this.updateStates();
        },
        value(val){
            this.currentValue = val
        }
    },
    mounted(){
        this.updateStates();
    }
})