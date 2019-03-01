var total = 15,h_w = $(window).height()/$(window).width(),activeIndex;
function render(total){
	var str = '';
	for(var i = 0; i < total; i++){
		str += '<li><img src = "./image./'+i+'.png" alt = ""></li>';
	}
	$(str).appendTo($('.wrapper')).animate({opacity: 1},500);
}
render(total);
$('ul').on('tap','li',function(){
    var index = activeIndex = $(this).index();
    loadImage(index);
})
function loadImage(index){
	$('.show-image').html("").show();
	var oImage = new Image();
	var image_src = './image./'+ index + '.png';
	oImage.src = image_src;
    oImage.onload = function(){
    	var w = this.width,h = this.height;
    	if(h/w > h_w){
    		$(this).appendTo($('.show-image')).css('height','100%').animate({opacity:1},500);
    	}else{
            $(this).appendTo($('.show-image')).css('width','100%').animate({opacity:1},500);
    	}
    }
}
$('.show-image')
       .on('tap',function(){
       	$(this).hide();
       })
       .on('swipeLeft',function(){
       	activeIndex++;
       	if(activeIndex > total-1){
       		activeIndex = total-1;
       	}else{
       		loadImage(activeIndex);
       	}
       })
       .on('swipeRight',function(){
       	activeIndex--;
       	if(activeIndex < 0){
       		activeIndex = 0;
       	}else{
       		loadImage(activeIndex);
       	}
       });