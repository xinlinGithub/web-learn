"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Search = function Search(name) {
    _classCallCheck(this, Search);

    this.name = name;
}
// 直接添加到私有属性中
;

Search.x = 3;


function myReadonly(proto, value, discripter) {
    console.log(proto, value, discripter);
}
var search = new Search("search");
