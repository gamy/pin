var activityCollection = require('../settings/mongo_config').activityCollection;
var relationCollection = require('../settings/mongo_config').relationCollection;
var commentCollection = require('../settings/mongo_config').commentCollection;

var timelineCollection = require('../settings/mongo_config').timelineCollection;
var userActivityCollection = require('../settings/mongo_config').userActivityCollection;


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

exports.create = function (req, res) {

    var attributes = ['shop', 'number', 'startDate', 'endDate', 'description', 'phone'];
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
    var uid = req.sessions.uid.toString();

    console.info('<delete> activity uid = ' + uid.toString() + ', aid = ' + aid.toString());
    activityCollection.findOne({_id: helper.ObjectID(aid), uid: uid}, function (err, item) {
        if (item) {
            res.send(helper.successJSON);
            activityCollection.updateById(aid, {$set: {deleted: true}});
        } else {
            res.send(helper.genErrorJSON(helper.ErrorCode.PermissionDenied));
        }
    });

}


//获取关注的机构的最新活动列表                                                                                    
exports.timeline = function (req, res) {

}

//获取单个活动
exports.detail = function (req, res) {
    var aid = req.params.aid;
    handleIDQuery(req, res, activityCollection, aid);

}

//获取附近的活动列表
exports.nearby = function (req, res) {

}

//根据城市获取活动列表
exports.city = function (req, res) {
    var city = req.params.city;
    handleListQuery(req, res, activityCollection, {city: city}, {_id: -1});

}

//根据城市/分类获取活动列表
exports.category = function (req, res) {
    var category = req.params.category;
    handleListQuery(req, res, activityCollection, {category: category}, {_id: -1});
}

//搜索活动列表
exports.search = function (req, res) {

}

//关注 取消关注 等
exports.relation = function (req, res) {

}

//获取活动的关注列表
exports.fans = function (req, res) {

}


//获取活动的评论列表
exports.comments = function (req, res) {

}


