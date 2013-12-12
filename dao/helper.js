var resUtil = require('../utils/resutil');
var reqUtil = require('../utils/requtil');

exports.dataUtil = require('../utils/datautil');
exports.collections = require('../settings/mongo_config');
exports.ErrorCode = require('../utils/error').ErrorCode;


exports.parseBody = reqUtil.parseBody;
exports.genJSON = resUtil.genJSON;
exports.genErrorJSON = resUtil.genErrorJSON;
exports.successJSON = resUtil.genSuccessJSON();


exports.ObjectID = require('mongoskin').ObjectID


exports.handleListQuery = require('../utils/mongoutil').handleListQuery;
exports.handleIDQuery = require('../utils/mongoutil').handleIDQuery;

exports.pushItemToIndex = require('../utils/mongoutil').pushItemToIndex;
exports.findIdListFromIndex = require('../utils/mongoutil').findIdListFromIndex;
exports.queryObjectListWithRange = require('../utils/mongoutil').queryObjectListWithRange