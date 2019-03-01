Vue.component('rate',{
    template: '\
        <div class="star-rating" :style="curSty"\
        @mousemove="onStarIn" @click="onStarClick" @mouseleave="onStarOut">\
            <div :star-data="tip" class="star-value" :class="getCls" :style="valSty">\
            </div>\
        </div>\
    ',
    props: {
        point: {
            type: Object,
            default(){
                return {
                    max: 5,
                    starSize: 48,
                    showTip: false,
                    stap: 1,
                    rating: 3
                }
            }
        }
    },
    data(){
        return {
            max: this.point.max || 15,
            starSize: this.point.starSize || 50,
            showTip: this.point.showTip || false,
            stap: this.point.stap || 1,
            rating: this.point.rating || 3,
            curRating: this.point.rating,
            tip: 0
        }
    },
    methods: {
        onStarIn(event){
            var x = event.offsetX;
            var percent = x / (this.max * this.starSize);
            var starnum = percent * this.max
            this.rating = Math.ceil(starnum);
            if(this.showTip){
                if(this.stap === 1) {
                    this.tip = this.rating + '/' + this.max;     
                }else{
                    var tipNum;
                    for(var i = 0; ; i += this.stap){
                        if(i >= starnum){
                            tipNum = i;
                            break;
                        }
                    }
                    this.rating = parseFloat(tipNum.toPrecision(12)) 
                    this.tip = this.rating + '/' + this.max;
                }
            }
        },
        onStarClick(event){
            this.curRating = this.rating;
        },
        onStarOut(event){
            this.rating = this.curRating;            
        }
    },
    computed: {
        getCls(){
            if(this.showTip){
                return [
                    'star-data'
                ]
            }
            
        },
        curSty(){
            return {
                backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDguOSIgaGVpZ2h0PSIxMDguOSIgdmlld0JveD0iMCAwIDEwOC45IDEwMy42Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2UzZTZlNjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPnN0YXJfMDwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj48cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMTA4LjkgMzkuNiA3MS4zIDM0LjEgNTQuNCAwIDM3LjYgMzQuMSAwIDM5LjYgMjcuMiA2Ni4xIDIwLjggMTAzLjYgNTQuNCA4NS45IDg4LjEgMTAzLjYgODEuNyA2Ni4xIDEwOC45IDM5LjYiLz48L2c+PC9nPjwvc3ZnPg==)',
                width: this.max * this.starSize + 'px',
                height: this.starSize + 'px',
                backgroundSize: this.starSize + 'px',
                cursor: 'pointer'  
            }
        },
        valSty(){
            return {
                height: '100%',
                position: 'relative',
                backgroundImage : 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDguOSIgaGVpZ2h0PSIxMDguOSIgdmlld0JveD0iMCAwIDEwOC45IDEwMy42Ij4KCTxkZWZzPgoJCTxzdHlsZT4uY2xzLTF7ZmlsbDojZjFjOTQ3O308L3N0eWxlPgoJPC9kZWZzPgoJPHRpdGxlPnN0YXIxPC90aXRsZT4KCTxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPgoJCTxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+CgkJCTxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSI1NC40IDAgNzEuMyAzNC4xIDEwOC45IDM5LjYgODEuNyA2Ni4xIDg4LjEgMTAzLjYgNTQuNCA4NS45IDIwLjggMTAzLjYgMjcuMiA2Ni4xIDAgMzkuNiAzNy42IDM0LjEgNTQuNCAwIi8+CgkJPC9nPgoJPC9nPgo8L3N2Zz4=)',
                width: this.rating * this.starSize + 'px',
                backgroundSize: this.starSize + 'px'
            }
        }
    }
})