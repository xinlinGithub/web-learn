define(['m1'],function(m1){
    var msg = 'm2.js';
    function showName() {
        console.log(msg);
        m1.getName();
    }
    return {
        showName
    }
})