
var div = document.getElementsByTagName("div")[0];
var n = 16;
var timer1, timer2;
function enlarge() {
    timer1 = setInterval(() => {
        div.style.fontSize = ++n + 'px';
        if(n > 50) {
            clearInterval(timer1);
            reduce();
        }
    },30)
}
function reduce() {
    timer2 = setInterval(() => {
        div.style.fontSize = --n + 'px';
        if(n < 12) {
            clearInterval(timer2);
            enlarge();
        }
    },20)
}
// enlarge();
