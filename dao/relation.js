var relationCollection = require('../settings/mongo_config').relationCollection;

//user activity
var userFollowerCollection = require('../settings/mongo_config').userFollowerCollection;

//user fans
var userFanCollection  = require('../settings/mongo_config').userFanCollection;


var helper = require('./helper');

//关注/取消/移除粉丝  action 在params中

//获取用户的关注列表

//获取用户的粉丝列表


exports.update = function(req, res){

}
exports.follows = function(req, res){

}


exports.fans = function(req, res){

}

exports.allFanIDs = function(uid, callback){
    helper.findIdListFromIndex(userFanCollection, uid, callback);
}
