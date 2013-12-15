var helper = require('./helper');
var userCollection = helper.collections.userCollection;
var userActivityCollection = helper.collections.userActivityCollection;
var activityCollection = helper.collections.activityCollection;
var followedActivityCollection = require('../settings/mongo_config').followedActivityCollection;
var eraseFields = ['password'];

//获取用户详细信息                                                                                                
exports.detail = function (req, res) {
    var uid = req.params.uid;
    console.log('get user detail, uid = ' + uid.toString());
    helper.handleIDQuery(userCollection, uid.toString(), eraseFields, function(err, item){
        var code = (err ? helper.ErrorCode.SystemError : 0);
        var response = helper.genJSON(item, code);
        res.send(response);
    });
}


//更新用户信息
//可以更新的属性
var updateUserAttributes = ['nick', 'city', 'latitude', 'longitude'];
exports.update = function (req, res) {
    var uid = req.params.uid.toString();
    var update = helper.parseBody(req.body, updateUserAttributes);
    userCollection.updateById(uid, {$set: update}, function (err) {
        var code = err ? helper.ErrorCode.UpdateUserError : 0;
        var response = helper.genJSON(null, code);
        res.send(response);
    });
}




//check!!
//获取用户发布的活动列表

exports.activities = function (req, res) {
    var owner = req.params.uid.toString();
    var page = parseInt(req.params.page);

    helper.queryObjectListFromIndexWithPage(owner, page, userActivityCollection, activityCollection, function (err, items, hasMoreData) {
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

exports.followedActivities = function (req, res) {
                      var owner = req.params.uid.toString();
                      var page = parseInt(req.params.page);

                      helper.queryObjectListFromIndexWithPage(owner, page, followedActivityCollection, activityCollection, function (err, items, hasMoreData) {
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