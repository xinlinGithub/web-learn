Vue.component('vTable',{
    render(h){
        var ths = [];
        var _this = this;
        this.currentColumns.forEach(function(item,index){
            if(item.sortable){
                ths.push(h('th',[
                    h('span',item.title),
                    h('a',{
                        class: {
                            on: item._sortType === 'asc'
                        },
                        on: {
                            click(){
                                _this.handleSortByAsc(index);
                            }
                        }
                    },'↑'),
                    h('a',{
                        class: {
                            on: item._sortType === 'desc'
                        },
                        on: {
                            click(){
                                _this.handleSortByDesc(index);
                            }
                        }
                    },'↓')
                ]))
            }else{
                ths.push(h('th',[h('span',item.title)]))
            }
        });
        var trs = [];
        this.currentData.forEach(function(row,index){
            var tds = [];
            _this.currentColumns.forEach(function(col,index){
                tds.push(h('td',row[col.key]));
            })   
            trs.push(h('tr',tds));       
        })
        return h('table',[
            h('thead',[h('tr',ths)]),
            h('tbody',trs)
        ])
    },
    props: {
        data: {
            type: Array,
            default(){
                return []
            }
        },
        columns: {
            type: Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentData: [],
            currentColumns: []
        }
    },
    methods: {
        makeData(){
            this.currentData = this.data.map(function(row,index){
                row._index = index;
                return row;
            })
            // console.log(this.data,this.currentData)
        },
        makeColumns(){
            this.currentColumns = this.columns.map(function(col,index){
                col._index = index;
                col._sortType = 'normal';
                return col;
            })
        },
        handleSortByAsc(index){
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function(col,index){
                col._sortType = 'normal';
            })
            this.currentColumns[index]._sortType = 'asc';
            this.currentData.sort(function(a,b){
                return a[key] - b[key];
            })
        },
        handleSortByDesc(index){
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function(col,index){
                col._sortType = 'normal';
            })
            this.currentColumns[index]._sortType = 'desc';
            this.currentData.sort(function(a,b){
                return b[key] - a[key];
            })
        }
    },
    watch: {
        data(){
            this.makeData();
            var _this = this;
            this.currentColumns.forEach(function(item,index){
                if(item._sortType == 'asc'){
                    _this.handleSortByAsc(item._index);
                }else if(item._sortType == 'desc') {
                    _this.handleSortByDesc(item._index)
                }
            })
        }
    },
    mounted(){
        this.makeColumns();
        this.makeData();
    }
})