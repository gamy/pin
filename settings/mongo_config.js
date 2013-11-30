var mongoskin = require("mongoskin");
var db = mongoskin.db('localhost:27017/charity?auto_reconnect=true&poolSize=1');


exports.activityCollection = db.collection('activity');

exports.organizationCollection = db.collection('organization');

exports.userCollection = db.collection('user');

exports.relationCollection = db.collection('relation');


