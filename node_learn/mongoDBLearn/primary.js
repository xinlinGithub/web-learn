//常用语法
/*
    show dbs 显示所有的数据库
    use dbs 有就使用 没有就创建 但必须有内容才能查出来
    db.getName() 
    db.createCollection(name);
    db.collection_name.insert({key: value,key:value,'''''});当没有此集合时直接创建
    db.c_name.update({key: value}, {$set: {key: value,''''}});
    db.c_name.update({k: v}, {$inc: {k: v}});
    db.c_name.remove({k: v});不加条件将集合里的内容全部删除
    db.c_name.find();
    db.c_name.find({k: v});
    db.c_name.find({age: {$gt: v}}); $lt $lte $gte $ne $nin $in
    db.c_name.find({$and: [{k: v},{k: v}]});
    db.c_name.find({$or: [{k:v},{k: v}]});
    db.c_name.find({age: {$in: [v,v,v]}});
    db.c_name.find({age: {$nin: [v,v,v,v]}});
    db.c_name.find({age: {$gte: v, $lte: v}});
    db.c_name.find(where).skip(2).limit(2);偏移两条 查询两条
    db.c_name.find().sort({k: -1/1});按什么排序 -1降序 1升序


*/