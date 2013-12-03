var helper = require('./helper');
var userCollection = helper.collections.userCollection;

//获取用户详细信息                                                                                                
exports.detail = function(req, res){
    var uid = req.params.uid;
    console.log('get user detail, uid = '+uid.toString());
    var eraseFields = ['password'];
    helper.handleIDQuery(req, res, userCollection, uid, eraseFields);
}

//更新用户 信息在body中

//something error
exports.update = function(req, res){
    var uid = req.params.uid;
    console.log('update user profile, uid = '+uid.toString());
    console.log('body = ' + req.body.city);

    var update = {nick:req.body.nick, city:req.body.city};

    userCollection.updateById(uid, {$set: update}, function(err){
       if(err){
           var result = helper.genErrorJSON(helper.ErrorCode.UpdateUserError);
       } else{
           res.send(helper.successJSON);
       }
    });
}


//获取用户关注的活动列表
exports.activities = function(req, res){

}
