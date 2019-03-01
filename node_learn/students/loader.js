var fs = require("fs");
var globalCongig = require("./conf");

var files = fs.readdirSync("./" + globalCongig.web_path);
var webMap = new Map();

for(var i = 0; i < files.length; i++){
    var temp = require("./" + globalCongig.web_path + "/" + files[i]);
    for(var prop of temp) {
        if(!webMap.has(prop[0])){
            webMap.set(prop[0], prop[1]);
        }else{
            throw new Error("this has same web function!")
        }
    }
}

module.exports = webMap;