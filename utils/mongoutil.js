var jsonUtil = require('./resutil');
var errorForCode = require('./error').errorForCode;
var ErrorCode = require('./error').ErrorCode;
var constant = require('../dao/constant');
var pageCount = constant.PAGE_COUNT;

var dataUtil = require('./datautil');

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
    collection.find({_id: {$in: idList}}).sort({_id: -1}).toArray(callback);
}


exports.handleIDListQuery = handleIDListQuery;

exports.queryObjectListWithRange = function (idCollection, id, idListField, callback) {
    idCollection.findById(id, {idListField: 1}, function (err, item) {
        if (err) {
            callback(err, null);
        } else {
            callback(err, item[idListField]);
        }
    });
}

exports.pushItemToIndex = function (collection, targetList, value) {
    console.info('<pushItem> targetList count = ' + targetList.length + ', value = ' + value.toString());
    if (targetList) {
        for (var i = 0; i < targetList.length; ++i) {
            var doc = {$push: {id_list: value}, $inc: {total: 1, unread:1}};
            collection.update({'owner': targetList[i]}, doc, {upsert: true, multi: false});
        }
    }
}

exports.findIdListFromIndex = function (collection, owner, callback) {
    collection.findById(owner.toString(), function (err, item) {
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

exports.queryObjectListWithRange = function (query, skip, limit, idCollection, idListField, objCollection, callback) {
    var slice = {idListField: {$slice: [skip, limit]}};
    idCollection.findOne(query, slice, function (err, item) {
        if (err) {
            callback(err, null);
        }
        var idList = item[idListField];
        handleIDListQuery(objCollection, idList, callback);
    });
}


