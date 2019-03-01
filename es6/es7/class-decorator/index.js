
class Search {
    static x = 3;
    constructor (name) {
        this.name = name
    }
    // 直接添加到私有属性中
    @myReadonly
    url = "url-A";
}

function myReadonly(proto, key ,discripter) {
    console.log(proto, key, discripter)
}
var search = new Search("search");
