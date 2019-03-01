

$('.nav-inp').keyup(function () {
    var value = $(this).val();
    $.ajax({
        type: 'GET',
        // url: 'http://localhost/web/douban/src/js/data.txt',
        url: 'https://api.douban.com/v2/music/search',
        data: 'q='+value+'&count=7',
        success: addList,
        dataType: 'jsonp'
    })
})
function addList(data) {
    var data = JSON.parse(data);
    var value = data.musics;
    console.log(value);
    $('ul','.search-data').html('');
    var str = '';

    $.each(value, function (index, ele) {
        str += '<li>\
                    <a href="http://localhost/web/douban/itemPage.html?id='+ele.id+'">\
                        <img src='+ ele.image +' alt="">\
                        <div>\
                            <span>'+ele.title+'</span>\
                            <p>'+ele.author[0].name+'</p>\
                        </div>\
                    </a>\
                </li>'
    })
    $('ul','.search-data').append(str);
}

