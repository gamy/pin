var resUtil = require('../utils/resutil');
var reqUtil = require('../utils/requtil');
var mongoutil = require('../utils/mongoutil');


exports.dataUtil = require('../utils/datautil');
exports.collections = require('../settings/mongo_config');
exports.ErrorCode = require('../utils/error').ErrorCode;


exports.parseBody = reqUtil.parseBody;
exports.genJSON = resUtil.genJSON;
exports.genErrorJSON = resUtil.genErrorJSON;
exports.successJSON = resUtil.genSuccessJSON();


exports.ObjectID = require('mongoskin').ObjectID


exports.handleIDQuery = mongoutil.handleIDQuery;
exports.pushItemToIndex = mongoutil.pushItemToIndex;
exports.removeItemFromIndex = mongoutil.removeItemFromIndex;
exports.findAllIdListFromIndex = mongoutil.findAllIdListFromIndex;
exports.queryObjectListWithRange = mongoutil.queryObjectListWithRange;
exports.queryObjectListFromIndexWithPage = mongoutil.queryObjectListFromIndexWithPage;


var pageCount = 20;
exports.pageCount = pageCount;
exports.skip = function (page) {
    return pageCount * page;
}