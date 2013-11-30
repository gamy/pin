var jsonutil = require('./response_util');
var errorForCode = require('./error').errorForCode;
var ErrorCode = require('./error').ErrorCode;
var constant = require('../dao/constant');
var pageCount = constant.PAGE_COUNT;


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
            var response = jsonutil.genJSON(null, items);
        }
        res.send(response);
    });
}

exports.handleIDQuery = function (req, res, collection, oid, eraseFields) {
    oid = oid.toString();
    console.log('<handleIDQuery> oid = ' + oid);
    collection.findById(oid, function (err, item) {
        if (err) {
            console.error('<handleListQuery> error = ' + err);
            var response = genErrorJSON(errorForCode(ErrorCode.SystemError));
        } else {
            if (eraseFields) {
                for (var i = 0; i < eraseFields.length; i++) {
                    var field = eraseFields[i];
                    item[field] = undefined;
                }
            }
            var response = jsonutil.genJSON(null, item);
        }
        res.send(response);
    });
}