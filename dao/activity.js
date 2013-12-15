var activityCollection = require('../settings/mongo_config').activityCollection;
var relationCollection = require('../settings/mongo_config').relationCollection;
var commentCollection = require('../settings/mongo_config').commentCollection;

var timelineCollection = require('../settings/mongo_config').timelineCollection;
var userActivityCollection = require('../settings/mongo_config').userActivityCollection;

var followedActivityCollection = require('../settings/mongo_config').followedActivityCollection;
var activityFansCollection = require('../settings/mongo_config').activityFansCollection;
var userCollection = require('../settings/mongo_config').userCollection;


var helper = require('./helper');
var relation = require('./relation');

var boardcastNewActivity = function (aid, uid) {
    relation.allFanIDs(uid, function (err, list) {
        if (!err) {
            list.push(uid);
            helper.pushItemToIndex(timelineCollection, list, aid);
        }
    });
}


var pushActivityIndex = function (aid, uid) {
    helper.pushItemToIndex(userActivityCollection, [uid], aid);
}

//check!!
exports.create = function (req, res) {

    var attributes = ['shop', 'number', 'startDate', 'endDate', 'description', 'phone', 'city'];
    var result = helper.parseBody(req.body, attributes);
    result._id = helper.ObjectID();
    var uid = req.session.uid.toString();
    result.uid = helper.ObjectID(uid);
    result.category = parseInt(req.params.category);
    result.createDate = new Date();

    result.shop = JSON.parse(result.shop.toString());

    activityCollection.insert(result, function (err) {
        var code = helper.ErrorCode.SystemError;
        if (!err) {
            result.createDate = Date.now();
            code = null;
        }
        var response = helper.genJSON(result, code);
        res.send(response);

        if (!err) {
            pushActivityIndex(result._id, helper.ObjectID(uid));
            boardcastNewActivity(result._id, helper.ObjectID(uid));
        }
    })
}


exports.delete = function (req, res) {
    var aid = req.params.aid.toString();
    var uid = req.session.uid.toString();

    console.info('<delete> activity uid = ' + uid.toString() + ', aid = ' + aid.toString());
    activityCollection.findOne({_id: helper.ObjectID(aid), uid: helper.ObjectID(uid)}, function (err, item) {
        if (item) {
            res.send(helper.successJSON);
            activityCollection.updateById(aid, {$set: {deleted: true}});
        } else {
            res.send(helper.genErrorJSON(helper.ErrorCode.PermissionDenied));
        }
    });

}


//获取关注的用户举办的最新活动列表
exports.timeline = function (req, res) {

    var owner = req.session.uid.toString();
    var page = parseInt(req.params.page);

    helper.queryObjectListFromIndexWithPage(owner, page, timelineCollection, activityCollection, function (err, items, hasMoreData) {
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
//获取单个活动
exports.detail = function (req, res) {
    var aid = req.params.aid.toString();
    helper.handleIDQuery(activityCollection, aid, [], function (err, item) {
        if (err) {
            var result = helper.genErrorJSON(helper.ErrorCode.SystemError);
        } else {
            if (!item || item.deleted) {
                var result = helper.genErrorJSON(helper.ErrorCode.ActivityDeleted);
            } else {
                var result = helper.genJSON(item);
            }
        }
        res.send(result);
    });
}

var findActivities = function (req, res, query, callback) {
    var sort = {_id: -1};
    var page = parseInt(req.params.page);
    var skip = helper.skip(page);
    var limit = helper.pageCount;
    helper.queryObjectListWithRange(activityCollection, query, sort, skip, limit, function (err, items) {
        if (err) {
            var result = helper.genErrorJSON(helper.ErrorCode.SystemError);
            res.send(result);
        } else {
            var hasMoreData = items.length >= limit;
            callback(items, hasMoreData);
        }
    });
}


//check!
//根据城市获取活动列表
exports.city = function (req, res) {
    var city = req.params.city.toString();
    var query = {city: city, deleted: {$ne: true}};
    findActivities(req, res, query, function (items, hasMoreData) {
        var result = helper.genJSON(items);
        result.hasMoreData = hasMoreData;
        res.send(result);
    });
}

//check!
//根据城市/分类获取活动列表
exports.category = function (req, res) {
    var category = parseInt(req.params.category);
    var city = req.params.city.toString();
    var query = {city: city, category: category, deleted: {$ne: true}};

    console.info('find activities by category, city = ' + city + ', category = ' + category);

    findActivities(req, res, query, function (items, hasMoreData) {
        var result = helper.genJSON(items);
        result.hasMoreData = hasMoreData;
        res.send(result);
    });
}

//获取附近的活动列表
exports.nearby = function (req, res) {

}


//搜索活动列表
exports.search = function (req, res) {

}

//关注 取消关注 等
exports.relation = function (req, res) {
    var uid = req.session.uid.toString();
    var aid = req.params.aid.toString();

    uid = helper.ObjectID(uid);
    aid = helper.ObjectID(aid);

    var type = req.query.type;

    //TODO check the relation before destroy.

    switch (type) {
        case 'follow':
            helper.pushItemToIndex(followedActivityCollection, [uid], aid);
            helper.pushItemToIndex(activityFansCollection,[aid],uid);
            break;

        case 'unfollow':
            helper.removeItemFromIndex(followedActivityCollection, [uid], aid);
            helper.removeItemFromIndex(activityFansCollection,[aid],uid);
            break;

        default :
            res.send(helper.genErrorJSON(helper.ErrorCode.ParameterError));
            return;
    }
    res.send(helper.successJSON);
}

//获取活动的关注列表
exports.fans = function (req, res) {
    var owner = req.params.aid.toString();
    var page = parseInt(req.params.page);

    helper.queryObjectListFromIndexWithPage(owner, page, activityFansCollection, userCollection, function (err, items, hasMoreData) {
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


//获取活动的评论列表
exports.comments = function (req, res) {

}


