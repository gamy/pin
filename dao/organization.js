var organizationCollection = require('../settings/mongo_config').organizationCollection;
var activityCollection = require('../settings/mongo_config').activityCollection;
var handleListQuery = require('../utils/mongoutil').handleListQuery;
var handleIDQuery = require('../utils/mongoutil').handleIDQuery;

//获取结构列表
exports.list = function(req, res){
	handleListQuery(req, res, {}, {_id:-1});
}

//获取单个机构
exports.detail = function(req, res){
    console.log('get organization detail');
	var oid = req.params.oid;
	handleIDQuery(req, res, organizationCollection, oid);
}

//获取附近的机构列表
exports.nearby = function(req, res){

}

//根据城市获取机构列表
exports.city = function(req, res){
	var city = req.params.city;
	handleListQuery(req, res, organizationCollection, {city:city}, {_id:-1});
}

//根据城市/分类获取机构列表
exports.category = function(req, res){
	var category = req.params.category;
	handleListQuery(req, res, organizationCollection, {category:category}, {_id:-1});
}

//搜索机构列表
exports.search = function(req, res){

}

//获取某个机构下的活动列表
exports.activities = function(req, res){
    console.log('get organization activities');
    var oid = req.params.oid.toString();
    handleListQuery(req, res, activityCollection, {'oid':oid}, {_id:-1});
}

//关注 取消关注 action 在params 等
exports.relation = function(req, res){

}

//获取机构的关注者列表
exports.fans = function(req, res){

}
