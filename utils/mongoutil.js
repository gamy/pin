var jsonUtil = require('./resutil');
var errorForCode = require('./error').errorForCode;
var ErrorCode = require('./error').ErrorCode;

var dataUtil = require('./datautil');
var ObjectID = require('mongoskin').ObjectID
var pageCount = 20;

/**
 *
 * @param collection
 * @param oid
 * @param eraseFields
 * @param callback (err, item)
 */
exports.handleIDQuery = function (collection, oid, eraseFields, callback) {
    collection.findById(oid, function (err, item) {
        if (err) {
            console.error('<handleListQuery> error = ' + err);
            callback(err, null);
        } else {
            dataUtil.enumList(eraseFields, function (value) {
                item[value] = undefined;
            });
            callback(err, item);
        }
    });
}


/**
 *
 * @param collection
 * @param idList string list
 * @param callback pass(err, items)
 */

var handleIDListQuery = function (collection, idList, callback) {
    collection.find({_id: {$in: idList}, deleted: {$ne: true}}).sort({_id: -1}).toArray(function (err, items) {
        if (err) {
            callback(err, items);
        } else {
            if (!items) {
                items = new Array();
            }
            callback(null, items);
        }
    });
}

exports.handleIDListQuery = handleIDListQuery;

exports.pushItemToIndex = function (collection, targetList, value) {
    console.info('<pushItem> targetList count = ' + targetList.length + ', value = ' + value.toString());
    if (targetList) {
        for (var i = 0; i < targetList.length; ++i) {
            var doc = {$push: {id_list: value}, $inc: {total: 1, unread: 1}};
            collection.update({'owner': targetList[i]}, doc, {upsert: true, multi: false});
        }
    }
}


exports.removeItemFromIndex = function (collection, targetList, value) {
    console.info('<pushItem> targetList count = ' + targetList.length + ', value = ' + value.toString());
    if (targetList) {
        for (var i = 0; i < targetList.length; ++i) {
            var doc = {$pull: {id_list: value}, $inc: {total: -1}};
            collection.update({'owner': targetList[i]}, doc);
        }
    }
}


/**
 * 根据主键的值去找出所有的id list
 *
 * @param collection
 * @param owner
 * @param callback
 */

exports.findAllIdListFromIndex = function (collection, owner, callback) {
    collection.findOne({owner: ObjectID(owner.toString())}, function (err, item) {
        if (err) {
            callback(err, null);
        } else {
            if (item && !item.id_list) {
                callback(null, item.id_list);
            } else {
                callback(null, new Array());
            }

        }
    })
}

/**
 * 从索引表中取出索引id，然后根据id list去查询结果
 *
 * @param query
 * @param skip
 * @param limit
 * @param idCollection
 * @param idListField
 * @param objCollection
 * @param callback
 */



var queryObjectListFromIndexWithRange = function (owner, skip, limit, idCollection, objCollection, callback) {
    var slice = {id_list: {$slice: [skip, limit]}};

    console.info('<queryObjectListFromIndexWithRange>, slice = ' + slice);

    idCollection.findOne({owner: ObjectID(owner)}, slice, function (err, item) {
        if (err) {
            callback(err, null);
        } else {
            if (item && item.id_list) {
                var idList = item.id_list;
                handleIDListQuery(objCollection, idList, function (err, items) {
                    callback(err, items, idList.length >= pageCount);
                });
            } else {
                callback(null, new Array(), false);
            }
        }
    });
}

exports.queryObjectListFromIndexWithPage = function (owner, page, idCollection, objCollection, callback) {

    idCollection.findOne({owner: ObjectID(owner)}, {total: 1}, function (err, item) {
        if (err) {
            callback(err, null);
        } else if (item && item.total) {
            var total = item.total;
            var skip = Math.max(total - pageCount * (page + 1), 0);
            var limit = Math.min(pageCount, total - pageCount * page);
            console.info('<queryObjectListFromIndexWithPage> page = ' + page + ', total = ' + total + ', skip = ' + skip + ' limit = ' + limit);
            if (limit <= 0) {
                callback(null, new Array(), false);
            } else {
                queryObjectListFromIndexWithRange(owner, skip, limit, idCollection, objCollection, callback);
            }
        } else {
            callback(null, new Array(), false);
        }
    });
}

exports.queryObjectListWithRange = function (collection, query, sort, skip, limit, callback) {
    collection.find(query).sort(sort).skip(skip).limit(limit).toArray(function (err, items) {
        if (err) {
            callback(err, null);
        } else {
            if (!items) {
                items = new Array();
            }
            callback(null, items);
        }
    });
}

