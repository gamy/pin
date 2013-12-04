var helper = require('./helper');
var userCollection = helper.collections.userCollection;



var eraseFields = ['password'];

//获取用户详细信息                                                                                                
exports.detail = function (req, res) {
    var uid = req.params.uid;
    console.log('get user detail, uid = ' + uid.toString());
    helper.handleIDQuery(userCollection, uid.toString(), eraseFields, function(err, item){
        var code = (err ? helper.ErrorCode.SystemError : null);
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
        if (err) {
            var result = helper.genErrorJSON(helper.ErrorCode.UpdateUserError);
            res.send(result);
        } else {
            res.send(helper.successJSON);
        }
    });
}


//获取用户关注的活动列表
exports.activities = function (req, res) {

}
