var userCollection = require('../settings/mongo_config').userCollection;
var relationCollection = require('../settings/mongo_config').relationCollection;


//获取用户详细信息                                                                                                
exports.detail = function(req, res){
	res.send('user detail');

}

//更新用户 信息在body中
exports.update = function(req, res){

}


//================== Relation =================


//关注/取消/移除粉丝  action 在params中
exports.relation = function(req, res){

}

//获取用户的关注列表
exports.follows = function(req, res){

}

//获取用户的粉丝列表
exports.fans = function(req, res){

} 

//获取用户关注的机构列表
exports.organizations = function(req, res){

}

//获取用户关注的活动列表
exports.activities = function(req, res){

}