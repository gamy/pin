var mongoskin = require("mongoskin");
var db = mongoskin.db('localhost:27017/pin?auto_reconnect=true&poolSize=1');


//shop
exports.shopCollection = db.collection('shop');

//activity for shop
exports.activityCollection = db.collection('activity');

//user
exports.userCollection = db.collection('user');

//user relation
exports.relationCollection = db.collection('relation');

//chat message
exports.messageCollection = db.collection('message');

//user comment for activity
exports.commentCollection = db.collection('comment');

//user action
exports.actionCollection = db.collection('action');


//user timeline
exports.timelineCollection = db.collection('timeline');

//user activity
exports.userActivityCollection = db.collection('user_activity');

//followed activity
exports.followedActivityCollection = db.collection('followed_activity');

//activity fans
exports.activityFansCollection = db.collection('activity_fans');

//user followers
exports.userFollowerCollection = db.collection('user_follower');

//user fans
exports.userFanCollection = db.collection('user_fan');

