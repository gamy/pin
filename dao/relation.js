var relationCollection = require('../settings/mongo_config').relationCollection;

//user activity
var userFollowerCollection = require('../settings/mongo_config').userFollowerCollection;

//user fans
var userFanCollection = require('../settings/mongo_config').userFanCollection;

var userCollection = require('../settings/mongo_config').userCollection;

var helper = require('./helper');

//关注/取消/移除粉丝  type 在params中


var updateRelation = function (uid, fid, follow, black) {

    if (black == undefined) {
        var doc = {$set: {follow: follow, black: black}};
    } else {
        var doc = {$set: {follow: follow}};
    }
    relationCollection.update({uid: uid, fid: fid}, doc, {upsert: true});
}


exports.update = function (req, res) {
    var uid = req.session.uid.toString();
    var fid = req.params.uid.toString();

    if (uid == fid) {
        req.send(helper.genErrorJSON(helper.ErrorCode.UpdateRelationWithSelf));
    }

    //TODO check the relation before remove

    uid = helper.ObjectID(uid);
    fid = helper.ObjectID(fid);
    var type = req.query.type;

    switch (type) {
        case 'follow':
            helper.pushItemToIndex(userFollowerCollection, [uid], fid);
            helper.pushItemToIndex(userFanCollection, [fid], uid);
            updateRelation(uid, fid, true);
            break;

        case 'unfollow':
            helper.removeItemFromIndex(userFollowerCollection, [uid], fid);
            helper.removeItemFromIndex(userFanCollection, [fid], uid);
            updateRelation(uid, fid, false);
            break;

        case 'remove':
            helper.removeItemFromIndex(userFollowerCollection, [fid], uid);
            helper.removeItemFromIndex(userFanCollection, [uid], fid);
            updateRelation(fid, uid, false)
            break;

        case 'black':
            updateRelation(fid, uid, false, true);
            break;

        default :
            res.send(helper.genErrorJSON(helper.ErrorCode.ParameterError));
            return;
    }
    res.send(helper.successJSON);
}

//check!
exports.follows = function (req, res) {
    var owner = req.params.uid.toString();
    var page = parseInt(req.params.page);

    helper.queryObjectListFromIndexWithPage(owner, page, userFollowerCollection, userCollection, function (err, items, hasMoreData) {
        if (err) {
            var result = helper.genErrorJSON(helper.ErrorCode.SystemError);
            res.send(result);
        } else {
            var result = helper.genJSON(items);
            result.hasMoreData = hasMoreData;
            res.send(result);
        }
    });
}

//check!
//获取用户的粉丝列表
exports.fans = function (req, res) {
    var owner = req.params.uid.toString();
    var page = parseInt(req.params.page);

    helper.queryObjectListFromIndexWithPage(owner, page, userFanCollection, userCollection, function (err, items, hasMoreData) {
        if (err) {
            var result = helper.genErrorJSON(helper.ErrorCode.SystemError);
            res.send(result);
        } else {
            var result = helper.genJSON(items);
            result.hasMoreData = hasMoreData;
            res.send(result);
        }
    });

}


//获取用户的粉丝列表
exports.allFanIDs = function (uid, callback) {
    helper.findIdListFromIndex(userFanCollection, uid, callback);
}
