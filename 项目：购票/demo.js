var oChange = document.getElementsByClassName('change')[0];
var oBefore = Array.prototype.slice.call(document.getElementsByClassName('before'));
var oCard = document.getElementsByClassName('card')[0];
var cities = document.getElementsByClassName('cities')[0];
var cancle = document.getElementsByClassName('cancle')[0];
var flag = false;
var deg = 0;
var oActive;

oChange.onclick = function () {
    flag = !flag;
    deg += 180;
    oBefore.forEach((item,index) => {
        item.className = flag ? 'after' : 'before';
    })
    this.style.transform = 'rotate(' + deg + 'deg)'
}
oBefore.forEach((ele,index) => {
    ele.addEventListener('click',function (e) {
        e.target.classList.add('active');
        oCard.style.left = '0';
        oActive = document.getElementsByClassName('active')[0];
    })
})
cities.addEventListener('click',(e) => {
    oActive.innerText = e.target.innerText;
    oCard.style.left = '100%';
    oActive.classList.remove('active');
})
cancle.addEventListener('click',(e) => {
    oCard.style.left = '100%';
    if(oActive){
        oActive.classList.remove('active')
    }
})


