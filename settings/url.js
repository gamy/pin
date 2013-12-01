
var user = require('../dao/user');
var auth = require('../dao/auth');
var relation = require('../dao/relation');

var activity = require("../dao/activity");
var action = require('../dao/action');
var comment = require("../dao/comment");
var message = require('../dao/message');


var params = require('express-params')


exports.map = function(app){
	
	params.extend(app);

	app.param('latitude', Number);
	app.param('longitude', Number);

    //TODO should be changed.

	app.param('category', /\w+/);
	app.param('page', Number);

    app.param('uid', /[a-z0-9]{24}/);
    app.param('oid', /[a-z0-9]{24}/);
    app.param('aid', /[a-z0-9]{24}/);

//	app.post('*', auth.requireAuthentication);
    app.put('*', auth.requireAuthentication);
    app.delete('*', auth.requireAuthentication);


	//===============  activity ===================

	//获取关注的机构的最新活动列表
	app.get('/activities/timeline/:page', activity.timeline); 

	//获取单个活动
	app.get('/activities/:aid', activity.detail); 

	//获取附近的活动列表
	app.get('/activities/nearby/:latitude,:longitude/:page', activity.nearby);

	//根据城市获取活动列表
	app.get('/activities/city/:city/:page', activity.city);

	//根据城市/分类获取活动列表
	app.get('/activities/:city/:category/:page', activity.category);

	//搜索活动列表
	app.get('/activities/search/:page', activity.search);

	//关注 取消关注 等
	app.put('/activities/:aid', activity.relation);

	//获取活动的关注列表
	app.get('/activities/:aid/fans/:page', activity.fans);

    //获取活动的评论
    app.get('/activities/:aid/comments/:page', activity.comments);



    //================== Auth ====================

	app.post('/auth/signup', auth.signup); 
	app.post('/auth/signin', auth.signin);

    app.get('/auth/logout', auth.requireAuthentication);
	app.get('/auth/logout', auth.logout);

	//================== User ====================

	//获取用户详细信息
	app.get('/users/:uid', user.detail);

	//更新用户 信息在body中
	app.put('/users/:uid/', user.update);

	//================== Relation =================


	//关注/取消/移除粉丝  action 在params中
	app.put('/users/:uid/relation', relation.update);

	//获取用户的关注列表
	app.get('/users:uid/followers/:page', relation.follows);

	//获取用户的粉丝列表
	app.get('/users:uid/fans/:page', relation.fans);

	//获取用户关注的活动列表
	app.get('/users/:uid/activities/:page', user.activities);


}
