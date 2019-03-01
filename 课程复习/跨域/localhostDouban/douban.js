
var timer = null;
$('.nav-inp').keyup(function () {
    clearTimeout(timer);//节流
    timer = setTimeout(() => {
        var value = $(this).val();
        if(value.trim() === "") {
            return ;
        }
        $.ajax({
            type: 'GET',
            url: 'https://api.douban.com/v2/music/search',/*模拟假数据*/
            data: 'q='+value+'&count=10',/*将q自动拼接到URL上'&q=成都'*/
            success: addList,/*成功之后执行该函数*/
            dataType: 'jsonp'/*不需要跨域就不用了，跨域的时候用*/
        })
    }, 400);
})
function addList(data) {
    var value = data.musics;
    console.log(value);
    $('ul','.search-data').html('');
    var str = '';
    $.each(value, function (index,ele) {
        if(!ele.author){
            str += '<li>\
                    <a href="https://music.douban.com/subject/'+ele.id+'">\
                        <img src='+ ele.image +' alt = "">\
                        <div>\
                            <span>'+ele.title+'</span>\
                        </div>\
                    </a>\
                </li>';
        }else{
            str += '<li>\
                    <a href="https://music.douban.com/subject/'+ele.id+'/">\
                        <img src='+ ele.image +' alt = "">\
                        <div>\
                            <span>'+ele.title+'</span>\
                            <p>'+ele.author[0].name+'</p>\
                        </div>\
                    </a>\
                </li>';
       
        }
    })
    $('ul','.search-data').append(str);
}

