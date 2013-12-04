var jsonUtil = require('./resutil');
var errorForCode = require('./error').errorForCode;
var ErrorCode = require('./error').ErrorCode;
var constant = require('../dao/constant');
var pageCount = constant.PAGE_COUNT;

var dataUtil = require('./datautil');

/*
exports.handleListQuery = function (req, res, collection, filter, sort, eraseFields) {
    var skip = pageCount * req.params.page;

    collection.find(filter).sort(sort).skip(skip).limit(pageCount).toArray(function (err, items) {
        if (err) {
            console.error('<handleListQuery> error = ' + err);
            var response = genErrorJSON(errorForCode(ErrorCode.SystemError));
        } else {

            if (eraseFields) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    for (var i = 0; i < eraseFields.length; i++) {
                        var field = eraseFields[i];
                        item[field] = undefined;
                    }
                }
            }
            var response = jsonUtil.genJSON(items);
        }
        res.send(response);
    });
}
*/


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
            dataUtil.enumList(eraseFields, function(value){
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


exports.handleIDListQuery = function (collection, idList, callback){
    collection.find({_id:{$in:idList}}).sort({_id:-1}).toArray(callback);
}