var app = new Vue({
    el: '#app',
    data: {
        data: [
            {
                name: '雍安帅',
                age: 18,
                birthday: '1999-02-21',
                address: '宁夏中卫'
            },
            {
                name: '郭文',
                age: 25,
                birthday: '1992-01-23',
                address: '潍坊诸城'
            },
            {
                name: '龚年文',
                age: 30,
                birthday: '1987-11-10',
                address: '陕西汉中'
            },
            {
                name: '陈修淋',
                age: 20,
                birthday: '1997-09-30',
                address: '山东菏泽'
            }
        ],
        columns: [
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '年龄',
                key: 'age',
                sortable: true
            },
            {
                title: '出生年月',
                key: 'birthday',
                sortable: true
            },
            {
                title: '地址',
                key: 'address'
            }
        ],
        flag: false
    },
    methods: {
        handleAddData(){
            if(this.flag){
                return false;
            }
            this.flag = true;
            this.data.push({
                name: '李双',
                age: 19,
                birthday: '1998-05-30',
                address: '江西南昌'
            })
        },
        handleDescData(){
            if(!this.flag){
                return false;
            }
            this.data.pop();
            this.flag = false;
        }
    }
})