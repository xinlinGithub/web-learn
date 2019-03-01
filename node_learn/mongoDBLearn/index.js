var mongo = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/panda";

function insertOne(dbs, collection, obj, callback) {
    mongo.connect(url,{useNewUrlParser:true},function(error, db) {
        if(error == null) {
            var database = db.db(dbs);
            database.collection(collection).insertOne(obj, function (err, res) {
               callback(err, res);
            })
            db.close();
        }else {
            console.log("Connection Error: " + error);
        }
    })
}
function remove(dbs, collection, where, callback){
    mongo.connect(url,{useNewUrlParser:true}, function (error, db) {
        if(error == null) {
            var database = db.db(dbs);
            database.collection(collection).remove(where, function (err, res) {
                if(err == null) {
                    console.log("Collection success!");
                }else {
                    console.log('Collection Error:' + err);
                }
            })
            db.close();
        }else {
            console.log("Connection Error: " + error)
        }
    })
}
function insertMany(dbs, collection, dbsArr, callback) {
    mongo.connect(url,{useNewUrlParser:true}, function (error, db) {
        if(error == null) {
            var database = db.db(dbs);
            database.collection(collection).insertMany(dbsArr, function (err, res) {
                callback(err, res);
            })
            db.close();
        }else  {
            console.log("Connection Error: " + error);
        }
    })
}
function createCollection(dbs, collection, callback) {
    mongo.connect(url, {useNewUrlParser: true}, function (error, db) {
        if(error == null){
            var database = db.db(dbs);
            database.createCollection(collection, function (err, res) {
                callback(err, res);
            })
        }else {
            console.log("Connection Error: " + error);
        }
        
    })
}

function dropCollection(dbs, collection, callback) {
    mongo.connect(url, {useNewUrlParser: true}, function (error, db) {
        if(error == null){
            var database = db.db(dbs);
            database.dropCollection(collection, function (err, res) {
                callback(err, res);
            })
            db.close();
        }else {
            console.log("Connection Error: " + error);
        }
        
    })
}
function updataOne(dbs, collection, where, obj, callback) {
    mongo.connect(url,{useNewUrlParser:true},function(error, db) {
        if(error == null) {
            var database = db.db(dbs);
            database.collection(collection).updateOne(where, obj, function (err, res) {
               callback(err, res);
            })
            db.close();
        }else {
            console.log("Connection Error: " + error);
        }
    })
}

function find(dbs, collection, where, callback) {
    mongo.connect(url,{useNewUrlParser:true},function(error, db) {
        if(error == null) {
            var database = db.db(dbs);
            database.collection(collection).find(where).toArray(function (err, res) {
                callback(err, res);
            })
            db.close();
        }else {
            console.log("Connection Error: " + error);
        }
    })
}
function findSort(dbs, collection, where,sort_where, callback) {
    mongo.connect(url,{useNewUrlParser:true},function(error, db) {
        if(error == null) {
            var database = db.db(dbs);
            database.collection(collection).find(where).sort(sort_where).toArray(function (err, res) {
                callback(err, res);
            })
            db.close();
        }else {
            console.log("Connection Error: " + error);
        }
    })
}

// 如果排序的话 默认先排序 后查找 不排序则正常
function findSkipLimit(dbs, collection, where, skip, limit,sort, callback) {
    mongo.connect(url,{useNewUrlParser: true} ,(error, db) => {
        if(error == null) {
            var database = db.db(dbs);
            database.collection(collection).find(where).skip(skip).limit(limit).sort(sort).toArray((err, res) => callback(err, res))
        }else {
            console.log("connection Error:" + error);
        }
        db.close();
    })
}
// 增删改查都有
module.exports.insertOne = insertOne;
module.exports.remove = remove;
module.exports.insertMany = insertMany;
module.exports.createCollection = createCollection;
module.exports.dropCollection = dropCollection;
module.exports.updataOne = updataOne;
module.exports.find = find;
module.exports.findSort = findSort;
module.exports.findSkipLimit = findSkipLimit;



