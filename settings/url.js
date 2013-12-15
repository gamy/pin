var user = require('../dao/user');
var auth = require('../dao/auth');
var relation = require('../dao/relation');

var activity = require("../dao/activity");
var action = require('../dao/action');
var comment = require("../dao/comment");
var message = require('../dao/message');


var params = require('express-params')


exports.map = function (app) {

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
//    app.put('*', auth.requireAuthentication);
//    app.delete('*', auth.requireAuthentication);

    /*
     app.all('*', function (req, res, next) {
     console.log('Method = ' + req.method);
     res.send('Method = '+ req.method.toString());
     //        next();
     });
     */
    //===============  activity ===================

    //删除活动*
    app.delete('/activities/:aid', auth.requireAuthentication);
    app.delete('/activities/:aid', activity.delete);


    //创建活动*
    app.post('/activities/:category', auth.requireAuthentication);
    app.post('/activities/:category', activity.create);


    //获取关注的用户的最新活动列表*
    app.get('/activities/timeline/:page', auth.requireAuthentication);
    app.get('/activities/timeline/:page', activity.timeline);

    //获取单个活动*
    app.get('/activities/:aid', activity.detail);


    //获取活动的关注列表*
    app.get('/activities/:aid/fans/:page', activity.fans);

    //关注 取消关注 等 ?type=follow/unfollow *
    app.put('/activities/:aid/relation', activity.relation);

    //获取活动的评论
    app.get('/activities/:aid/comments/:page', activity.comments);


    //获取附近的活动列表
    app.get('/activities/nearby/:latitude,:longitude/:page', activity.nearby);


    //根据城市获取活动列表 *
    app.get('/activities/city/:city/:page', activity.city);

    //根据城市/分类获取活动列表 *
    app.get('/activities/:city/:category/:page', activity.category);

    //搜索活动列表 ?q=?
    app.get('/activities/:city/search/:page', activity.search);



    //================== Auth ====================

    //注册 *
    app.post('/auth/signup', auth.signup);
    //登录 *
    app.post('/auth/signin', auth.signin);

    //登出 *
    app.get('/auth/logout', auth.requireAuthentication);
    app.get('/auth/logout', auth.logout);

    //================== User ====================

    //获取用户详细信息 *
    app.get('/users/:uid', user.detail);

    //更新用户 信息在body中 *
    app.put('/users/:uid', user.update);

    //================== Relation =================


    //关注/取消/移除粉丝  ?type=follow/unfollow/remove/black *
    app.put('/users/:uid/relation', auth.requireAuthentication);
    app.put('/users/:uid/relation', relation.update);

    //获取用户的关注列表 *
    app.get('/users/:uid/followers/:page', relation.follows);

    //获取用户的粉丝列表 *
    app.get('/users/:uid/fans/:page', relation.fans);

    //获取用户关注的活动列表 *
    app.get('/users/:uid/activities/followed/:page', user.followedActivities);


    //获取用户举办的活动列表
    app.get('/users/:uid/activities/:page', user.activities);

}
