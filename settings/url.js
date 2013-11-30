
var user = require('../dao/user');
var activity = require("../dao/activity");
var organization = require("../dao/organization");
var auth = require('../dao/auth');
var params = require('express-params')


exports.map = function(app){
	
	params.extend(app);

	app.param('latitude', Number);
	app.param('longitude', Number);
	app.param('category', Number);
	app.param('page', Number);

    app.param('uid', /[a-z0-9]{24}/);
    app.param('oid', /[a-z0-9]{24}/);
    app.param('aid', /[a-z0-9]{24}/);

	app.all('*', auth.requireAuthentication);
	// app.get('/test/:act', routes.act); 

	//=================== organization ===============



	//获取结构列表
	app.get('/organizations/:page', organization.list); 

	//获取单个机构
	app.get('/organizations/:oid', organization.detail); 

	//获取附近的机构列表
	app.get('/organizations/nearby/:latitude,:longitude/:page', organization.nearby);

	//根据城市获取机构列表
	app.get('/organizations/city/:city/:page', organization.city);

	//根据城市/分类获取机构列表
	app.get('/organizations/:city/:category/:page', organization.category);

	//搜索机构列表
	app.get('/organizations/search/:page', organization.search);


    //获取某个机构下的活动列表

    app.get('/organizations/:oid/activities/:page', organization.activities);


	//关注 取消关注 action 在params 等
	app.put('/organizations/:oid/relation', organization.relation);

	//获取机构的关注者列表
	app.get('/organizations/:oid/fans/:page', organization.fans);


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


	//================== Auth ====================
	app.post('/auth/signup', auth.signup); 
	app.post('/auth/signin', auth.signin);
	app.post('/auth/logout', auth.logout); 

	//================== User ====================

	//获取用户详细信息
	app.get('/users/:uid', user.detail);

	//更新用户 信息在body中
	app.put('/users/:uid/', user.update);

	//================== Relation =================


	//关注/取消/移除粉丝  action 在params中
	app.put('/users/:uid/relation', user.relation);

	//获取用户的关注列表
	app.get('/users:uid/followers/:page', user.follows);

	//获取用户的粉丝列表
	app.get('/users:uid/fans/:page', user.fans);

	//获取用户关注的机构列表
	app.get('/users/:uid/organizations/:page', user.organizations);

	//获取用户关注的活动列表
	app.get('/users/:uid/activities/:page', user.activities);

	// app.all('*', auth.notfound);


}
