// 主入口文件
(function(){
    require.config({
        paths:{
            m2: './modules/m2',
            m1: './modules/m1'            
        }
    })
    require(['m2'],function(m2){
        m2.showName();
    })
})()