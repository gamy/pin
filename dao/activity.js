
var activityCollection = require('../settings/mongo_config').activityCollection;
var commentCollection = require('../settings/mongo_config').commentCollection;

var constant = require('./constant');


var handleListQuery = require('../utils/mongoutil').handleListQuery;
var handleIDQuery = require('../utils/mongoutil').handleIDQuery;




//获取关注的机构的最新活动列表                                                                                    
exports.timeline = function(req, res){

}

//获取单个活动
exports.detail = function(req, res){
    var aid = req.params.aid;
    handleIDQuery(req, res, activityCollection, aid);

}

//获取附近的活动列表
exports.nearby = function(req, res){

}

//根据城市获取活动列表
exports.city = function(req, res){
    var city = req.params.city;
    handleListQuery(req, res, activityCollection, {city:city}, {_id:-1});

}

//根据城市/分类获取活动列表
exports.category = function(req, res){
    var category = req.params.category;
    handleListQuery(req, res, activityCollection, {category:category}, {_id:-1});
}

//搜索活动列表
exports.search = function(req, res){

}

//关注 取消关注 等
exports.relation = function(req, res){

}

//获取活动的关注列表
exports.fans = function(req, res){

}


//获取活动的评论列表
exports.comments = function(req, res){

}
